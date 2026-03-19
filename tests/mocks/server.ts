import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const server = setupServer(
  http.post('/api/repositories', () =>
    HttpResponse.json({
      repositoryId: 'mock-repo',
      filesIndexed: 120,
    })
  ),
  http.delete('/api/repositories/:id', () => HttpResponse.json({ success: true }))
)
