import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
  it('renders a heading', async () => {
    render(<Home />)
    const blocksButton = await screen.getByText('Blocks')
    expect(blocksButton).toBeInTheDocument()
  })
})
