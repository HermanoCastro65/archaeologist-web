import { randomUUID } from 'crypto'

export type FileProps = {
  id?: string
  repositoryId: string
  scanId: string
  path: string
  size: number
  hash?: string | null
  isArchived?: boolean
  deletedAt?: Date | null
  createdAt?: Date
}

export class File {
  public readonly id: string
  public repositoryId: string
  public scanId: string
  public path: string
  public size: number
  public hash?: string | null
  public isArchived: boolean
  public deletedAt: Date | null
  public createdAt: Date

  constructor(props: FileProps) {
    this.id = props.id ?? randomUUID()
    this.repositoryId = props.repositoryId
    this.scanId = props.scanId
    this.path = props.path
    this.size = props.size
    this.hash = props.hash ?? null
    this.isArchived = props.isArchived ?? false
    this.deletedAt = props.deletedAt ?? null
    this.createdAt = props.createdAt ?? new Date()
  }

  rename(newPath: string) {
    this.path = newPath
  }

  archive() {
    this.isArchived = true
  }

  delete() {
    this.deletedAt = new Date()
  }
}
