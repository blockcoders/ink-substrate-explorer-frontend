import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContractDetails from '../../pages/contracts/contract/[address]'
import { contractBase64Metada, contractDetailsMock } from '../../_mocks/contracts-mocks'

userEvent.setup()

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      hash: '5G63pMxBnvnvdxDDbGrNsR27vkBmgLbSLXi134dxzaDhTL9v',
    },
  }),
}))

jest.mock('../../generated', () => ({
  useGetContractQueriesQuery: jest.fn(() => {
    return {
      data: {
        getContractQueries: contractDetailsMock,
      },
    }
  }),
  useUploadMetadataMutation: jest.fn(() => [jest.fn()]),
}))

describe('Contract Details', () => {
  let element: HTMLElement
  beforeEach(() => {
    const { container } = render(<ContractDetails />)
    element = container
  })

  it('should render contract ABI verified', async () => {
    const el = element.getElementsByClassName('ink-tab_button')[0]

    await waitFor(() => expect(el.innerHTML).toContain('Contract ABI Verified'))
  })

  it('should render contract ABI data', async () => {
    const el = element.getElementsByClassName('form-control')[0]

    await waitFor(() => expect(el.textContent).toContain(contractDetailsMock.metadata))
  })

  it('should show upload ABI textarea', () => {
    const el = element.getElementsByClassName('ink-tab_button')[1]

    fireEvent.click(el)

    const textAreaEl = screen.getByPlaceholderText(
      'Plase upload the metadata of the contract in a Base64 encoded format.',
    )

    expect(textAreaEl).toBeInTheDocument()
  })

  it('should upload metadata', async () => {
    const el = element.getElementsByClassName('ink-tab_button')[1]

    fireEvent.click(el)

    const textAreaEl = screen.getByPlaceholderText(
      'Plase upload the metadata of the contract in a Base64 encoded format.',
    )

    fireEvent.change(textAreaEl, { target: { value: contractBase64Metada } })
    expect(textAreaEl.value).toBe(contractBase64Metada)

    const uploadBtn = screen.getByText('Upload')

    fireEvent.click(uploadBtn)

    await waitFor(() => expect(textAreaEl.value).toBe(''))
  })

  it('should render contract methods accordion', () => {
    const el = element.getElementsByClassName('ink-tab_button')[2]

    fireEvent.click(el)

    const accordionBtns = element?.getElementsByClassName('accordion-button') || []

    if (accordionBtns.length === 0) throw new Error('fail ')

    contractDetailsMock.queries.forEach((btn, index) => {
      expect(accordionBtns[index].innerHTML).toContain(contractDetailsMock.queries[index].name)
    })
  })

  it('should fill gasLimit, storageLimint and value', () => {
    const el = element.getElementsByClassName('ink-tab_button')[2]
    fireEvent.click(el)

    const accEl = element.getElementsByClassName('accordion-collapse')[0]

    const showMoreBtn = accEl.getElementsByClassName('ink-button')[0]
    fireEvent.click(showMoreBtn)

    const inputElements = accEl.getElementsByClassName('form-control')

    fireEvent.change(inputElements[0], { target: { value: 80000000000000 } })
    fireEvent.change(inputElements[1], { target: { value: 100000 } })
    fireEvent.change(inputElements[2], { target: { value: 100 } })

    expect(inputElements[0].value).toContain('80000000000000')
    expect(inputElements[1].value).toContain('100000')
    expect(inputElements[2].value).toContain('100')
  })
})
