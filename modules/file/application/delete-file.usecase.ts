import { IFileRepository } from '../domain/IFileRepository'

export class DeleteFileUseCase {
  constructor(private repository: IFileRepository) {}

  async execute({ fileId }: { fileId: string }) {
    const file = await this.repository.findById(fileId)

    if (!file) throw new Error('File not found')

    await this.repository.delete(fileId)
  }
}
