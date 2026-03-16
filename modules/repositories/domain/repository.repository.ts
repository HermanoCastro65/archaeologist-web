import { Repository } from "./Repository"

export interface RepositoryRepository {

  findByUrl(url: string): Promise<Repository | null>

  save(repository: Repository): Promise<void>

}