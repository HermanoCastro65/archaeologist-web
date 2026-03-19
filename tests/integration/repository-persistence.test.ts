import { describe, it, expect } from 'vitest'
import { prisma } from '@/lib/db/prisma'
import { CreateRepositoryUseCase } from '@/modules/repositories/application/create-repository.usecase'
import { ScanRepositoryUseCase } from '@/modules/repositories/application/scan-repository.usecase'
import { randomUUID } from 'crypto'

describe('Repository persistence', () => {
  it('should persist repository, scan and files correctly', async () => {
    const userId = randomUUID()

    const createRepository = new CreateRepositoryUseCase()

    const repository = await createRepository.execute({
      url: 'https://github.com/octocat/Hello-World',
      userId,
    })

    const scanner = new ScanRepositoryUseCase()

    const result = await scanner.execute(repository.id)

    const dbRepository = await prisma.repository.findUnique({
      where: { id: repository.id },
    })

    const scans = await prisma.repositoryScan.findMany({
      where: { repositoryId: repository.id },
    })

    const files = await prisma.repositoryFile.findMany({
      where: { repositoryId: repository.id },
    })

    expect(dbRepository).not.toBeNull()
    expect(dbRepository?.url).toBe(repository.url.value)

    expect(scans.length).toBeGreaterThan(0)

    const latestScan = scans[scans.length - 1]

    expect(latestScan.status).toBe('finished')
    expect(latestScan.filesCount).toBe(result.filesIndexed)

    expect(files.length).toBe(result.filesIndexed)
    expect(files.length).toBeGreaterThan(0)
  })
})
