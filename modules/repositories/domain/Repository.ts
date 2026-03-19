import { RepositoryUrl } from './RepositoryUrl'
import { randomUUID } from 'crypto'

type Provider = 'github'

interface RepositoryProps {
  id?: string
  url: RepositoryUrl
  userId: string
  createdAt?: Date
}

export class Repository {
  public readonly id: string
  public readonly url: RepositoryUrl
  public readonly owner: string
  public readonly name: string
  public readonly provider: Provider
  public readonly createdAt: Date
  public readonly userId: string

  constructor({ id, url, userId, createdAt }: RepositoryProps) {
    this.id = id ?? randomUUID()
    this.url = url
    this.owner = url.owner
    this.name = url.name
    this.provider = 'github'
    this.userId = userId
    this.createdAt = createdAt ?? new Date()
  }

  get fullName(): string {
    return `${this.owner}/${this.name}`
  }

  toJSON() {
    return {
      id: this.id,
      url: this.url.value,
      owner: this.owner,
      name: this.name,
      provider: this.provider,
      userId: this.userId,
      createdAt: this.createdAt,
    }
  }
}
