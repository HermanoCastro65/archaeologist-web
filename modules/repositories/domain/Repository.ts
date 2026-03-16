import { RepositoryUrl } from './RepositoryUrl'
import { randomUUID } from 'crypto'

export class Repository {
  public readonly id: string
  public readonly url: RepositoryUrl
  public readonly owner: string
  public readonly name: string
  public readonly provider: 'github'
  public readonly createdAt: Date
  public readonly userId: string

  constructor(params: { id?: string; url: RepositoryUrl; userId: string; createdAt?: Date }) {
    this.id = params.id ?? randomUUID()

    this.url = params.url
    this.owner = params.url.owner
    this.name = params.url.name

    this.provider = 'github'

    this.userId = params.userId

    this.createdAt = params.createdAt ?? new Date()
  }

  get fullName(): string {
    return `${this.owner}/${this.name}`
  }
}
