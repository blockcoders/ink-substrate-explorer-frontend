import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { blockMocks } from '../_mocks/block-mocks'
import Blocks from '../pages/blocks'

const user = userEvent.setup()

jest.mock('lodash', () => ({
  get: jest.fn(() => blockMocks.slice(0, 10)),
}))

describe('Home', () => {
  let container: HTMLElement | null = null

  beforeEach(() => {
    const r = render(<Blocks />)
    container = r.container
  })

  it('Should render 10 block rows', async () => {
    const tbody = await screen.getByTestId('tbody')

    expect(tbody.children.length).toBe(10)
    expect(tbody.children[0].innerHTML).toContain(blockMocks[0].hash)
    expect(tbody.children[1].innerHTML).toContain(blockMocks[1].hash)
    expect(tbody.children[2].innerHTML).toContain(blockMocks[2].hash)
    expect(tbody.children[3].innerHTML).toContain(blockMocks[3].hash)
    expect(tbody.children[4].innerHTML).toContain(blockMocks[4].hash)
    expect(tbody.children[5].innerHTML).toContain(blockMocks[5].hash)
    expect(tbody.children[6].innerHTML).toContain(blockMocks[6].hash)
    expect(tbody.children[7].innerHTML).toContain(blockMocks[7].hash)
    expect(tbody.children[8].innerHTML).toContain(blockMocks[8].hash)
    expect(tbody.children[9].innerHTML).toContain(blockMocks[9].hash)
  })

  it('should render header link buttons', async () => {
    const headerLinks = await screen.getByTestId('header-links')

    expect(headerLinks).toBeInTheDocument()
    expect(headerLinks.children[0].children[0].textContent).toBe('Blocks')
    expect(headerLinks.children[1].children[0].textContent).toBe('Transactions')
    expect(headerLinks.children[2].children[0].textContent).toBe('Contracts')
  })

  it('show show next page', async () => {
    // const nextPageFunc = jest.fn()
    // jest.spyOn(container, 'nextPage')
    // const prevBtn = await screen.getByTestId('prev-btn')
    // const nextBtn = await screen.getByTestId('next-btn')
    // await fireEvent.click(nextBtn)
    // const tbody = await screen.getByTestId('tbody')
    // expect(tbody.children.length).toBe(1)
  })
})
