import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { contractTransactionsMocks } from '../../_mocks/contracts-mocks'
import ContractTransactions from '../../pages/contracts/transactions/[address]'
import { IntlProvider } from 'react-intl'
import { messages } from '../../pages/_app'

userEvent.setup()

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      hash: '5G63pMxBnvnvdxDDbGrNsR27vkBmgLbSLXi134dxzaDhTL9v',
    },
    locale: 'en',
  }),
}))

jest.mock('../../generated', () => ({
  useGetTransactionsByContractQuery: jest.fn((...params) => {
    const [{ variables }] = params

    let getTransactionsByContract = [...contractTransactionsMocks]

    if (variables.orderAsc) {
      getTransactionsByContract = getTransactionsByContract.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
    }

    return {
      data: {
        getTransactionsByContract: getTransactionsByContract.slice(
          variables?.skip || 0,
          variables?.skip + variables?.take || 5,
        ),
      },
    }
  }),
}))

describe('Contract transactions', () => {
  beforeEach(() => {
    render(
      <IntlProvider locale="en" messages={messages['en']}>
        <ContractTransactions />
      </IntlProvider>,
    )
  })

  it('should render 5 transactions', async () => {
    const tbody = await screen.getByTestId('tbody')

    expect(tbody.children.length).toBe(5)
    expect(tbody.children[0].innerHTML).toContain(contractTransactionsMocks[0].hash)
    expect(tbody.children[1].innerHTML).toContain(contractTransactionsMocks[1].hash)
    expect(tbody.children[2].innerHTML).toContain(contractTransactionsMocks[2].hash)
    expect(tbody.children[3].innerHTML).toContain(contractTransactionsMocks[3].hash)
    expect(tbody.children[4].innerHTML).toContain(contractTransactionsMocks[4].hash)
  })

  it('should show an empty block hash', async () => {
    const tbody = await screen.getByTestId('tbody')
    expect(tbody.children[0].innerHTML).toContain('...')
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
    expect(tbody.children.length).toBe(5)
  })

  it('should order by timestap', async () => {
    const timeHeader = await screen.getByText('Time')

    await fireEvent.click(timeHeader)

    const tbody = await screen.getByTestId('tbody')

    expect(tbody.children[0].innerHTML).toContain(contractTransactionsMocks[5].hash)
  })
})
