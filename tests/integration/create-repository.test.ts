import { describe, it, expect } from "vitest"
import { CreateRepositoryUseCase } from "@/modules/repositories/application/create-repository.usecase"
import { prisma } from "@/lib/db/prisma"

describe("CreateRepositoryUseCase", () => {

  it("should create repository in database", async () => {

    const usecase = new CreateRepositoryUseCase()

    const repo = await usecase.execute({
      url: "https://github.com/nodejs/node"
    })

    const found = await prisma.repository.findFirst({
      where: { id: repo.id }
    })

    expect(found).not.toBeNull()
    expect(found?.url).toBe("https://github.com/nodejs/node")

  })

})