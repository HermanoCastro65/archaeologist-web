import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Sidebar from '@/components/sidebar/Sidebar'

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: '1',
          owner: 'facebook',
          name: 'react',
        },
      ]),
  })
) as any

describe('Sidebar', () => {
  it('renders repository list', async () => {
    const { findByText } = render(<Sidebar />)

    const repo = await findByText('facebook/react')

    expect(repo).toBeTruthy()
  })
})
