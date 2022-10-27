import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { contractEventsMocks } from '../../_mocks/contracts-mocks'
import ContractTransactions from '../../pages/contracts/events/[address]'

userEvent.setup()

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      hash: '5G63pMxBnvnvdxDDbGrNsR27vkBmgLbSLXi134dxzaDhTL9v',
    },
  }),
}))

jest.mock('../../generated', () => ({
  useGetEventsQuery: jest.fn((...params) => {
    const [{ variables }] = params

    let getEvents = [...contractEventsMocks]

    if (variables.orderAsc) {
      getEvents = getEvents.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
    }

    return {
      data: {
        getEvents: getEvents.slice(variables?.skip || 0, variables?.skip + variables?.take || 5),
      },
    }
  }),
}))

describe('Contract Events', () => {
  beforeEach(() => {
    render(<ContractTransactions />)
  })

  it('should render 5 transactions', async () => {
    const tbody = await screen.getByTestId('tbody')

    expect(tbody.children.length).toBe(5)
    expect(tbody.children[0].innerHTML).toContain(contractEventsMocks[0].transactionHash)
    expect(tbody.children[1].innerHTML).toContain(contractEventsMocks[1].transactionHash)
    expect(tbody.children[2].innerHTML).toContain(contractEventsMocks[2].transactionHash)
    expect(tbody.children[3].innerHTML).toContain(contractEventsMocks[3].transactionHash)
    expect(tbody.children[4].innerHTML).toContain(contractEventsMocks[4].transactionHash)
  })

  it('should show next page', async () => {
    const nextBtn = await screen.getByTestId('next-btn')
    await fireEvent.click(nextBtn)
    const tbody = await screen.getByTestId('tbody')
    expect(tbody.children.length).toBe(1)
  })

  it('should show previous page', async () => {
    const nextBtn = await screen.getByTestId('next-btn')
    await fireEvent.click(nextBtn)

    const prevBtn = await screen.getByTestId('prev-btn')
    await fireEvent.click(prevBtn)

    const tbody = await screen.getByTestId('tbody')
    expect(tbody.children.length).toBe(5)
  })

  it('should order by timestap', async () => {
    const timeHeader = await screen.getByText('Time')

    await fireEvent.click(timeHeader)

    const tbody = await screen.getByTestId('tbody')

    expect(tbody.children[0].innerHTML).toContain(contractEventsMocks[5].transactionHash)
  })
})
