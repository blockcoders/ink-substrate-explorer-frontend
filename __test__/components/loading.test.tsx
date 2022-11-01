import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Loading } from '../../components/Loading/Loading'

describe('Loading', () => {
  it('show render', async () => {
    const { container } = render(<Loading />)

    const img = container.querySelector('img')

    expect(img).toBeInTheDocument()
  })
})
