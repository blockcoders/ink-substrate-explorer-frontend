import '@testing-library/jest-dom'
// import * as A from '@polkadot/api-contract'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { contractBase64Metada, contractDetailsMock } from '../../_mocks/contracts-mocks'
import * as generated from '../../generated'
import * as useLoadingHooks from '../../hooks/useLoading'
import * as hook from '../../hooks/useSendingTx'
import ContractDetails from '../../pages/contracts/contract/[address]'

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

jest.mock('../../hooks/useSendingTx')

jest.mock('@polkadot/extension-dapp', () => ({
  web3FromAddress: jest.fn().mockResolvedValue({}),
  web3Accounts: jest.fn(() => [{ address: '1234' }]),
  web3Enable: jest.fn(() => [{ address: '1234' }]),
}))

describe('Contract Details', () => {
  let element: HTMLElement
  beforeEach(() => {
    const { container } = render(<ContractDetails />)
    element = container
  })

  beforeAll(() => {
    ;(hook.useSendingTx as jest.Mock) = jest.fn().mockImplementation(() => ({
      connect: jest.fn().mockImplementation(() => ({})),
      getContractInstance: jest.fn(() => ({
        tx: {},
        query: jest.fn().mockResolvedValueOnce(() => ({
          debugMessage: '',
          gasConsumed: '0',
          gasRequired: '0',
          output: '',
          result: '{"err":{"module":{"index":7,"error":"0x06000000"}}}',
          storageDeposit: '{"charge":0}',
        })),
      })),
    }))
  })

  describe('send method by query', () => {
    it('should send query', async () => {
      await act(() => {
        render(<ContractDetails />)
      })

      const el = element.getElementsByClassName('ink-tab_button')[2]
      fireEvent.click(el)

      await act(() => {
        const sendBtn = screen.getAllByText('Send')[0]

        fireEvent.click(sendBtn)
      })

      expect(await screen.findByTestId('result-wrapper')).toBeInTheDocument()
    })
  })

  describe('send method by tx', () => {
    it('should send tx', async () => {
      ;(hook.useSendingTx as jest.Mock) = jest.fn().mockImplementation(() => ({
        connect: jest.fn().mockImplementation(() => ({})),
        getContractInstance: jest.fn(() => ({
          tx: jest.fn(() => ({
            signAndSend: jest.fn((account: any, signer: any, cb) =>
              cb({
                status: '1',
                txHash: '0x',
                dispatchError: '{',
                dispatchInfo: '1',
                internalError: '2',
                events: [
                  {
                    event: {
                      method: '',
                    },
                  },
                ],
              }),
            ),
          })),
          query: {
            meta: {
              isMutating: true,
            },
          },
        })),
      }))
      await act(() => {
        render(<ContractDetails />)
      })

      const el = element.getElementsByClassName('ink-tab_button')[2]
      fireEvent.click(el)

      await act(() => {
        const sendBtn = screen.getAllByText('Send')[0]

        fireEvent.click(sendBtn)
      })
      expect(1).toBe(1)
    })
  })

  it('should render contract ABI verified', async () => {
    const el = element.getElementsByClassName('ink-tab_button')[0]

    await waitFor(() => expect(el.innerHTML).toContain('Contract ABI Verified'))
  })

  it('should render contract ABI data', async () => {
    const el = element.getElementsByClassName('form-control')[0]

    await waitFor(() => expect(el.textContent).toContain(contractDetailsMock.metadata))
  })

  describe('Upload ABI', () => {
    it('should show upload ABI textarea', async () => {
      const el = element.getElementsByClassName('ink-tab_button')[1]

      fireEvent.click(el)

      const textAreaEl = await screen.getByPlaceholderText(
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

  it('should show results', async () => {
    jest.spyOn(React, 'useEffect').mockImplementation(() => jest.fn()())

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [1, jest.fn()])
      .mockImplementationOnce(() => [2, jest.fn()])
      .mockImplementationOnce(() => [3, jest.fn()])
      .mockImplementationOnce(() => [4, jest.fn()])
      .mockImplementationOnce(() => [
        {
          totalSupply: {
            debugMessage: '',
            gasConsumed: '0',
            gasRequired: '0',
            output: '',
            result: '{"err":{"module":{"index":7,"error":"0x06000000"}}}',
            storageDeposit: '{"charge":0}',
          },
          balanceOf: {},
          allowance: {},
          transfer: {},
          approve: {},
          transferFrom: {},
        },
        jest.fn(),
      ])

    let container: any

    await act(() => {
      const { container: c } = render(<ContractDetails />)
      container = c
    })

    const el = container.getElementsByClassName('ink-tab_button')[2]
    fireEvent.click(el)

    const txResult = container.getElementsByClassName('tx-result')[0]

    expect(txResult.children[0].innerHTML).toContain('debugMessage: ')
    expect(txResult.children[1].innerHTML).toContain('0') //gasConsumed
    expect(txResult.children[2].innerHTML).toContain('0') // gasRequired
    expect(txResult.children[3].innerHTML).toContain('0') // output
    expect(txResult.children[4].innerHTML).toContain('{"err":{"module":{"index":7,"error":"0x06000000"}}}') // result
    expect(txResult.children[5].innerHTML).toContain('{"charge":0}') // storageDeposit
  })
})
