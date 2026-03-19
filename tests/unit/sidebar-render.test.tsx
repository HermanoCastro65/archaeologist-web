import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Sidebar from '@/components/sidebar/Sidebar'

describe('Sidebar', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: '1', owner: 'facebook', name: 'react' }]),
      })
    ) as any
  })

  it('should render repositories', async () => {
    const { findByText } = render(<Sidebar />)
    const repo = await findByText('facebook/react')
    expect(repo).toBeTruthy()
  })
})
