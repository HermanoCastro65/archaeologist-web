import { IFileRepository } from '../domain/IFileRepository'

export class ArchiveFileUseCase {
  constructor(private repository: IFileRepository) {}

  async execute({ fileId }: { fileId: string }) {
    const file = await this.repository.findById(fileId)

    if (!file) throw new Error('File not found')

    file.archive()

    await this.repository.save(file)

    return file
  }
}
