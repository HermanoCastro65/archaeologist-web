import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RepositoryItem from '@/components/sidebar/RepositoryItem'

describe('RepositoryItem', () => {
  it('should render repository full name', () => {
    const { getByText } = render(
      <RepositoryItem repo={{ id: '1', owner: 'vercel', name: 'next.js' }} reload={() => {}} />
    )

    expect(getByText('vercel/next.js')).toBeTruthy()
  })
})
