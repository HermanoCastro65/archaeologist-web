export class RepositoryUrl {

  public readonly value: string
  public readonly owner: string
  public readonly name: string

  constructor(url: string) {

    const normalized = this.normalize(url)

    const regex =
      /^https:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)$/i

    const match = normalized.match(regex)

    if (!match) {
      throw new Error("Invalid GitHub repository URL")
    }

    this.owner = match[1]
    this.name = match[2]
    this.value = normalized
  }

  private normalize(url: string): string {

    let cleaned = url.trim()

    if (cleaned.endsWith(".git")) {
      cleaned = cleaned.slice(0, -4)
    }

    if (cleaned.endsWith("/")) {
      cleaned = cleaned.slice(0, -1)
    }

    return cleaned
  }

}