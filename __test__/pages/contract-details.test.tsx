import '@testing-library/jest-dom'
// import * as A from '@polkadot/api-contract'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { contractBase64Metada, contractDetailsMock } from '../../_mocks/contracts-mocks'
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

const showErrorToastMock = jest.fn()
const startLoadingMock = jest.fn()
const endLoadingMock = jest.fn()

jest.mock('../../hooks', () => ({
  useToast: jest.fn().mockImplementation(() => ({
    showErrorToast: showErrorToastMock,
    showLoadingToast: jest.fn(),
    showSuccessToast: jest.fn(),
  })),
  useLoading: jest.fn().mockImplementation(() => ({
    isLoading: false,
    startLoading: startLoadingMock,
    endLoading: endLoadingMock,
  })),
}))

const web3EnableMock = jest.fn(() => [{ address: '1234' }])

describe('Contract Details', () => {
  let element: HTMLElement
  beforeEach(async () => {
    await act(() => {
      const { container } = render(<ContractDetails />)
      element = container
    })
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

  it('should send query', async () => {
    jest.doMock('@polkadot/extension-dapp', () => ({
      __esModule: true,
      web3FromAddress: jest.fn().mockResolvedValue({}),
      web3Accounts: jest.fn(() => [{ address: '1234' }]),
      web3Enable: web3EnableMock,
    }))

    let localElement: HTMLElement

    await act(() => {
      const { container: _container } = render(<ContractDetails />)
      localElement = _container
    })

    const el = localElement.getElementsByClassName('ink-tab_button')[2]

    fireEvent.click(el)

    const sendBtn = localElement.getElementsByClassName('send-btn')[0]

    await act(() => {
      fireEvent.click(sendBtn)
    })

    expect(endLoadingMock).toHaveBeenCalled()
  })

  it('should send tx', async () => {
    jest.doMock('@polkadot/extension-dapp', () => ({
      __esModule: true,
      web3FromAddress: jest.fn().mockResolvedValue({}),
      web3Accounts: jest.fn(() => [{ address: '1234' }]),
      web3Enable: web3EnableMock,
    }))
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
    let localElement: HTMLElement

    await act(() => {
      const { container } = render(<ContractDetails />)
      localElement = container
    })

    const el = element.getElementsByClassName('ink-tab_button')[2]
    fireEvent.click(el)
    const sendBtn = localElement.getElementsByClassName('send-btn')[0]

    await act(() => {
      fireEvent.click(sendBtn)
    })
    expect(endLoadingMock).toHaveBeenCalled()
  })

  it('should render contract ABI verified', async () => {
    const el = element.getElementsByClassName('ink-tab_button')[0]

    expect(el.innerHTML).toContain('Contract ABI Verified')
  })

  it('should render contract ABI data', async () => {
    const el = element.getElementsByClassName('form-control')[0]

    await waitFor(() => expect(el.textContent).toContain(contractDetailsMock.metadata))
  })

  describe('Upload ABI', () => {
    it('should show upload ABI textarea', async () => {
      jest.doMock('@polkadot/extension-dapp', () => ({
        __esModule: true,
        web3FromAddress: jest.fn().mockResolvedValue({}),
        web3Accounts: jest.fn(() => [{ address: '1234' }]),
        web3Enable: web3EnableMock,
      }))
      const el = element.getElementsByClassName('ink-tab_button')[1]

      fireEvent.click(el)

      const textAreaEl = await screen.getByPlaceholderText(
        'Plase upload the metadata of the contract in a Base64 encoded format.',
      )

      expect(textAreaEl).toBeInTheDocument()
    })

    it('should upload metadata', async () => {
      jest.doMock('@polkadot/extension-dapp', () => ({
        __esModule: true,
        web3FromAddress: jest.fn().mockResolvedValue({}),
        web3Accounts: jest.fn(() => [{ address: '1234' }]),
        web3Enable: web3EnableMock,
      }))
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
    jest.doMock('@polkadot/extension-dapp', () => ({
      __esModule: true,
      web3FromAddress: jest.fn().mockResolvedValue({}),
      web3Accounts: jest.fn(() => [{ address: '1234' }]),
      web3Enable: web3EnableMock,
    }))
    const el = element.getElementsByClassName('ink-tab_button')[2]

    fireEvent.click(el)

    const accordionBtns = element?.getElementsByClassName('accordion-button') || []

    if (accordionBtns.length === 0) throw new Error('fail ')

    contractDetailsMock.queries.forEach((btn, index) => {
      expect(accordionBtns[index].innerHTML).toContain(contractDetailsMock.queries[index].name)
    })
  })

  it('should fill gasLimit, storageLimint and value', () => {
    jest.doMock('@polkadot/extension-dapp', () => ({
      __esModule: true,
      web3FromAddress: jest.fn().mockResolvedValue({}),
      web3Accounts: jest.fn(() => [{ address: '1234' }]),
      web3Enable: web3EnableMock,
    }))
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

  it('should show error sending', async () => {
    jest.doMock('@polkadot/extension-dapp', () => ({
      __esModule: true,
      web3FromAddress: 1,
      web3Accounts: jest.fn(() => [{ address: '1234' }]),
      web3Enable: web3EnableMock,
    }))
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
    let localElement: HTMLElement

    await act(() => {
      const { container } = render(<ContractDetails />)
      localElement = container
    })

    const el = element.getElementsByClassName('ink-tab_button')[2]
    await act(() => {
      fireEvent.click(el)
    })

    const sendBtn = localElement.getElementsByClassName('send-btn')[0]

    await act(() => {
      fireEvent.click(sendBtn)
    })

    await act(() => {
      const { container } = render(<ContractDetails />)
      localElement = container
    })

    expect(showErrorToastMock).toHaveBeenCalled()
  })

  it('should show results', async () => {
    jest.doMock('@polkadot/extension-dapp', () => ({
      __esModule: true,
      web3FromAddress: jest.fn().mockResolvedValue({}),
      web3Accounts: jest.fn(() => [{ address: '1234' }]),
      web3Enable: jest.fn(() => [{ address: '1234' }]),
    }))

    jest.spyOn(React, 'useEffect').mockImplementation(() => jest.fn()())

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => [
        {
          totalSupply: {
            debugMessage: '',
            gasConsumed: '0',
            gasRequired: '0',
            output: '',
            result: '{"err":{"module":{"index":7,"error":"0x06000000"}}}',
            storageDeposit: '{"charge":0}',
            txHash: '0x123',
            status: '{"extrinsciSuccess": true, "inBlock": "0x123"}',
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
    expect(txResult.children[6].innerHTML).toContain('0x123') // txHash
    expect(txResult.children[7].innerHTML).toContain('0x123') // status
  })

  describe('No polkadot extension', () => {
    it('should show "No extension installed!" message', async () => {
      jest.doMock('@polkadot/extension-dapp', () => ({
        __esModule: true,
        web3FromAddress: jest.fn(() => {}),
        web3Accounts: jest.fn(() => [{ address: '1234' }]),
        web3Enable: jest.fn(() => []),
      }))

      await act(() => {
        render(<ContractDetails />)
      })

      expect(showErrorToastMock).toHaveBeenCalled()
    })
  })
})
