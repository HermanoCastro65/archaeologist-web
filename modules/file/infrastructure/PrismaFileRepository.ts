import { prisma } from '@/lib/db/prisma'
import { File } from '../domain/File'
import { IFileRepository } from '../domain/IFileRepository'

export class PrismaFileRepository implements IFileRepository {
  async findById(id: string) {
    const data = await prisma.repositoryFile.findUnique({
      where: { id },
    })

    if (!data) return null

    return new File(data)
  }

  async findByRepositoryAndPath(repositoryId: string, path: string) {
    const data = await prisma.repositoryFile.findFirst({
      where: { repositoryId, path },
    })

    if (!data) return null

    return new File(data)
  }

  async save(file: File) {
    await prisma.repositoryFile.update({
      where: { id: file.id },
      data: {
        path: file.path,
        isArchived: file.isArchived,
        deletedAt: file.deletedAt,
      },
    })
  }

  async delete(id: string) {
    await prisma.repositoryFile.delete({
      where: { id },
    })
  }
}
