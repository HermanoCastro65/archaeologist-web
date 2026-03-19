import { describe, it, expect, beforeEach } from 'vitest'
import { DeleteFileUseCase } from '@/modules/file/application/delete-file.usecase'
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

describe('DeleteFileUseCase', () => {
  let repository: InMemoryFileRepository
  let usecase: DeleteFileUseCase

  beforeEach(() => {
    repository = new InMemoryFileRepository()
    usecase = new DeleteFileUseCase(repository)
  })

  it('should delete file', async () => {
    const file = new File({
      repositoryId: 'repo',
      scanId: 'scan',
      path: '/file.ts',
      size: 100,
    })

    await repository.save(file)

    await usecase.execute({
      fileId: file.id,
    })

    const deleted = await repository.findById(file.id)

    expect(deleted).toBeNull()
  })
})
