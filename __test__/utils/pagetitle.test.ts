import '@testing-library/jest-dom'
import { getTitle } from '../../utils/pagetitile'

describe('Page title', () => {
  it('should show Block titile', () => {
    const title = getTitle('localhost/block')

    expect(title).toBe('Block')
  })
})
