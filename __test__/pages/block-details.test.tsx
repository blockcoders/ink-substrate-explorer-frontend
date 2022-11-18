import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { oneBlockMock } from '../../_mocks/block-mocks'
import { formatTimeAgo } from '../../lib/utils'
import BlockDetails from '../../pages/block/details/[hash]'

userEvent.setup()

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      hash: '',
    },
  }),
}))

jest.mock('../../generated', () => ({
  useGetBlockQuery: jest.fn(() => {
    return {
      data: {
        getBlock: oneBlockMock,
      },
    }
  }),
  useGetTransactionsByBlockQuery: jest.fn((...params) => {
    const [{ variables }] = params

    let getTransactions = [...oneBlockMock.fetchedTx]

    if (variables.orderAsc) {
      getTransactions = getTransactions.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
    }

    return {
      data: {
        getTransactions: getTransactions.slice(variables?.skip || 0, variables?.skip + variables?.take || 10),
      },
    }
  }),
}))

describe('Block details', () => {
  beforeEach(() => {
    render(<BlockDetails />)
  })

  it('should show block info', async () => {
    const blockInfo = await screen.getByTestId('tbody-block')

    expect(blockInfo.children[0].children[1].innerHTML).toContain(oneBlockMock.number.toString())
    expect(blockInfo.children[1].children[1].innerHTML).toContain(oneBlockMock.hash)
    expect(blockInfo.children[2].children[1].innerHTML).toContain(formatTimeAgo(oneBlockMock.timestamp, 'en'))
    expect(blockInfo.children[3].children[1].innerHTML).toContain(oneBlockMock.parentHash)
    expect(blockInfo.children[4].children[1].innerHTML).toContain(`${oneBlockMock.encodedLength} bytes`)
  })

  it('should show a empty hash', async () => {
    const tbody = await screen.getByTestId('tbody-tx')

    expect(tbody.children[0].innerHTML).toContain('...')
  })

  it('should render pagintion buttons', async () => {
    const prevBtn = await screen.getByTestId('prev-btn')
    const nextBtn = await screen.getByTestId('prev-btn')
    expect(prevBtn).toBeInTheDocument()
    expect(nextBtn).toBeInTheDocument()
  })

  it('should show next page', async () => {
    const nextBtn = await screen.getByTestId('next-btn')
    await fireEvent.click(nextBtn)
    const tbody = await screen.getByTestId('tbody-tx')
    expect(tbody.children.length).toBe(1)
  })

  it('should show previous page', async () => {
    const nextBtn = await screen.getByTestId('next-btn')
    await fireEvent.click(nextBtn)

    const prevBtn = await screen.getByTestId('prev-btn')
    await fireEvent.click(prevBtn)

    const tbody = await screen.getByTestId('tbody-tx')
    expect(tbody.children.length).toBe(5)
  })

  it('should show first page after click previoues', async () => {
    const prevBtn = await screen.getByTestId('prev-btn')
    await fireEvent.click(prevBtn)

    const tbody = await screen.getByTestId('tbody-tx')
    expect(tbody.children.length).toBe(5)
  })

  it('should show first an empty page', async () => {
    const nextBtn = await screen.getByTestId('next-btn')
    await fireEvent.click(nextBtn)
    await fireEvent.click(nextBtn)
    await fireEvent.click(nextBtn)

    const tbody = await screen.getByTestId('tbody-tx')
    expect(tbody.children.length).toBe(1)
  })

  it('should order by timestap', async () => {
    const timeHeader = await screen.getByText('Time')

    await fireEvent.click(timeHeader)

    const tbody = await screen.getByTestId('tbody-tx')

    expect(tbody.children[0].innerHTML).toContain(oneBlockMock.fetchedTx[5].hash)
  })
})
