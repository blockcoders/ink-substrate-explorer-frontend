import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IntlProvider } from 'react-intl'
import { contractsMocks } from '../../_mocks/contracts-mocks'
import { messages } from '../../pages/_app'
import Contracts from '../../pages/contracts'

userEvent.setup()

jest.mock('../../generated', () => ({
  useGetContractsQuery: jest.fn((...params) => {
    const [{ variables }] = params

    let getContracts = [...contractsMocks]

    if (variables.orderAsc) {
      getContracts = getContracts.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
    }

    return {
      data: {
        getContracts: getContracts.slice(variables?.skip || 0, variables?.skip + variables?.take || 10),
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

describe('Contracts', () => {
  beforeEach(() => {
    render(
      <IntlProvider locale="en" messages={messages['en']}>
        <Contracts />
      </IntlProvider>,
    )
  })

  it('should render 10 contracts', async () => {
    const tbody = await screen.getByTestId('tbody')

    expect(tbody.children.length).toBe(10)
    expect(tbody.children[0].innerHTML).toContain(contractsMocks[0].address)
    expect(tbody.children[1].innerHTML).toContain(contractsMocks[1].address)
    expect(tbody.children[2].innerHTML).toContain(contractsMocks[2].address)
    expect(tbody.children[3].innerHTML).toContain(contractsMocks[3].address)
    expect(tbody.children[4].innerHTML).toContain(contractsMocks[4].address)
    expect(tbody.children[5].innerHTML).toContain(contractsMocks[5].address)
    expect(tbody.children[6].innerHTML).toContain(contractsMocks[6].address)
    expect(tbody.children[7].innerHTML).toContain(contractsMocks[7].address)
    expect(tbody.children[8].innerHTML).toContain(contractsMocks[8].address)
    expect(tbody.children[9].innerHTML).toContain(contractsMocks[9].address)
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
})
