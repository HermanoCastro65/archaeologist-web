import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DeleteRepositoryButton from '@/components/sidebar/DeleteRepositoryButton'

describe('DeleteRepositoryButton', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    ) as any
  })

  it('should call delete endpoint', async () => {
    const reload = vi.fn()

    const { getByText } = render(<DeleteRepositoryButton id="123" reload={reload} />)

    const user = userEvent.setup()
    await user.click(getByText('✕'))

    expect(fetch).toHaveBeenCalledWith('/api/repositories/123', {
      method: 'DELETE',
    })
  })
})
