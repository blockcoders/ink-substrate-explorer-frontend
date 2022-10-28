import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'
import { useSendingTx } from '../../hooks/useSendingTx'

const WS_PROVIDER = 'wss://rococo-contracts-rpc.polkadot.io'

jest.mock('@polkadot/api', () => ({
  ...jest.requireActual('@polkadot/api'),
  ApiPromise: {
    create: jest.fn(() => ({
      isReady: true,
    })),
  },
}))

jest.mock('@polkadot/api-contract', () => ({
  ...jest.requireActual('@polkadot/api-contract'),
  ContractPromise: jest.fn(() => ({
    query: {
      transfer: {
        meta: {
          isMutating: true,
        },
      },
    },
    tx: {
      transfer: jest.fn(() => ({
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
    },
  })),
}))

describe('useSendingTx', () => {
  it('should return apiPromise', async () => {
    const { result } = renderHook(() => useSendingTx())

    const r = await result.current.connect(WS_PROVIDER)
    expect(r.isReady).toBe(true)
  })

  it('should return tx and query of a contract', async () => {
    const { result } = renderHook(() => useSendingTx())

    const r = await result.current.connect(WS_PROVIDER)

    const { query, tx } = await result.current.getContractInstance(r, 'abi' as any, '0x123', 'transfer')

    expect(query?.meta?.isMutating).toBe(true)
    expect(tx('0x123' as any).addSignature).toBeDefined
  })
})
