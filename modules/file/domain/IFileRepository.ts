import { File } from './File'

export interface IFileRepository {
  findById(id: string): Promise<File | null>
  findByRepositoryAndPath(repositoryId: string, path: string): Promise<File | null>
  save(file: File): Promise<void>
  delete(id: string): Promise<void>
}
