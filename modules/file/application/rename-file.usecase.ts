import { IFileRepository } from '../domain/IFileRepository'

export class RenameFileUseCase {
  constructor(private repository: IFileRepository) {}

  async execute({ fileId, newPath }: { fileId: string; newPath: string }) {
    const file = await this.repository.findById(fileId)

    if (!file) throw new Error('File not found')

    const existing = await this.repository.findByRepositoryAndPath(file.repositoryId, newPath)

    if (existing && existing.id !== file.id) {
      throw new Error('File already exists with this path')
    }

    file.rename(newPath)

    await this.repository.save(file)

    return file
  }
}
