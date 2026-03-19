import { describe, it, expect, beforeEach } from 'vitest'
import { RenameFileUseCase } from '@/modules/file/application/rename-file.usecase'
import { File } from '@/modules/file/domain/File'
import { IFileRepository } from '@/modules/file/domain/IFileRepository'

class InMemoryFileRepository implements IFileRepository {
  items: File[] = []

  async findById(id: string) {
    return this.items.find((i) => i.id === id) ?? null
  }

  async findByRepositoryAndPath(repositoryId: string, path: string) {
    return this.items.find((i) => i.repositoryId === repositoryId && i.path === path) ?? null
  }

  async save(file: File) {
    const index = this.items.findIndex((i) => i.id === file.id)
    if (index >= 0) this.items[index] = file
    else this.items.push(file)
  }

  async delete(id: string) {
    this.items = this.items.filter((i) => i.id !== id)
  }
}

describe('RenameFileUseCase', () => {
  let repository: InMemoryFileRepository
  let usecase: RenameFileUseCase

  beforeEach(() => {
    repository = new InMemoryFileRepository()
    usecase = new RenameFileUseCase(repository)
  })

  it('should rename file', async () => {
    const file = new File({
      repositoryId: 'repo',
      scanId: 'scan',
      path: '/old.ts',
      size: 100,
    })

    await repository.save(file)

    await usecase.execute({
      fileId: file.id,
      newPath: '/new.ts',
    })

    const updated = await repository.findById(file.id)

    expect(updated?.path).toBe('/new.ts')
  })
})
