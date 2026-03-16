import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const server = setupServer(
  http.post('/api/repositories', () => {
    return HttpResponse.json({
      repositoryId: 'mock-repo',
      filesIndexed: 120,
    })
  })
)
