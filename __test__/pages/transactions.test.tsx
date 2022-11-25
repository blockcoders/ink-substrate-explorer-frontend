import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IntlProvider } from 'react-intl'
import { transactionsMocks } from '../../_mocks/transactions-mocks'
import { messages } from '../../pages/_app'
import Transactions from '../../pages/transactions'

userEvent.setup()

jest.mock('../../generated', () => ({
  useGetTransactionsQuery: jest.fn((...params) => {
    const [{ variables }] = params

    let getTransactions = [...transactionsMocks]

    if (variables.orderAsc) {
      getTransactions = getTransactions.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
    }

    return {
      data: {
        getTransactions: getTransactions.slice(variables?.skip || 0, variables?.skip + variables?.take || 10),
      },
      loading: true,
    }
  }),
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    locale: 'en',
  })),
}))

describe('Transactions', () => {
  beforeEach(() => {
    render(
      <IntlProvider locale="en" messages={messages['en']}>
        <Transactions />
      </IntlProvider>,
    )
  })

  it('should render 10 transaction rows', async () => {
    const tbody = await screen.getByTestId('tbody')

    expect(tbody.children.length).toBe(10)
    expect(tbody.children[0].innerHTML).toContain(transactionsMocks[0].hash)
    expect(tbody.children[1].innerHTML).toContain(transactionsMocks[1].hash)
    expect(tbody.children[2].innerHTML).toContain(transactionsMocks[2].hash)
    expect(tbody.children[3].innerHTML).toContain(transactionsMocks[3].hash)
    expect(tbody.children[4].innerHTML).toContain(transactionsMocks[4].hash)
    expect(tbody.children[5].innerHTML).toContain(transactionsMocks[5].hash)
    expect(tbody.children[6].innerHTML).toContain(transactionsMocks[6].hash)
    expect(tbody.children[7].innerHTML).toContain(transactionsMocks[7].hash)
    expect(tbody.children[8].innerHTML).toContain(transactionsMocks[8].hash)
    expect(tbody.children[9].innerHTML).toContain(transactionsMocks[9].hash)
  })

  it('should an empty blockhash', async () => {
    const tbody = await screen.getByTestId('tbody')

    const firstRow = tbody.children[0]
    expect(firstRow.children[1].innerHTML).toContain('')
  })

  it('should render header link buttons', async () => {
    const headerLinks = await screen.getByTestId('header-links')

    expect(headerLinks).toBeInTheDocument()
    expect(headerLinks.children[0].children[0].textContent).toBe('Blocks')
    expect(headerLinks.children[1].children[0].textContent).toBe('Transactions')
    expect(headerLinks.children[2].children[0].textContent).toBe('Contracts')
  })

  it('should show next page', async () => {
    const nextBtn = await screen.getByTestId('next-btn')
    await fireEvent.click(nextBtn)
    const tbody = await screen.getByTestId('tbody')
    expect(tbody.children.length).toBe(1)
  })

  it('should show last page', async () => {
    const nextBtn = await screen.getByTestId('next-btn')
    await fireEvent.click(nextBtn)
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
    expect(tbody.children.length).toBe(10)
  })

  it('should show first page', async () => {
    const prevBtn = await screen.getByTestId('prev-btn')
    await fireEvent.click(prevBtn)
    await fireEvent.click(prevBtn)

    const tbody = await screen.getByTestId('tbody')
    expect(tbody.children.length).toBe(10)
  })

  it('should order by timestap', async () => {
    const timeHeader = await screen.getByText('Time')

    await fireEvent.click(timeHeader)

    const tbody = await screen.getByTestId('tbody')

    expect(tbody.children[0].innerHTML).toContain(transactionsMocks[10].hash)
  })
})
