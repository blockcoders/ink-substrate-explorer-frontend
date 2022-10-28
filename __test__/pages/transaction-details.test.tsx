import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { oneTransactionMck } from '../../_mocks/transactions-mocks'
import { formatTimeAgo } from '../../lib/utils'
import TransactionDetails from '../../pages/transaction/details/[hash]'

userEvent.setup()

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      hash: oneTransactionMck.hash,
    },
  }),
}))

jest.mock('../../generated', () => ({
  useGetTransactionQuery: jest.fn(() => {
    return {
      data: {
        getTransaction: oneTransactionMck,
      },
    }
  }),
}))

describe('Transaction details', () => {
  let element: HTMLElement

  beforeEach(() => {
    const { container } = render(<TransactionDetails />)
    element = container
  })

  it('should show transaction info', async () => {
    const txInfo = await screen.getByTestId('tbody')

    expect(txInfo.children[0].children[1].innerHTML).toContain(oneTransactionMck.hash)
    expect(txInfo.children[1].children[1].innerHTML).toContain(oneTransactionMck.blockHash)
    expect(txInfo.children[2].children[1].innerHTML).toContain(formatTimeAgo(oneTransactionMck.timestamp))
    expect(txInfo.children[3].children[1].innerHTML).toContain(oneTransactionMck.section)
    expect(txInfo.children[4].children[1].innerHTML).toContain(oneTransactionMck.method)
    expect(txInfo.children[5].children[1].innerHTML).toContain(oneTransactionMck.signer)
    expect(txInfo.children[6].children[1].innerHTML).toContain(oneTransactionMck.signature)
    expect(txInfo.children[7].children[1].innerHTML).toContain(oneTransactionMck.nonce.toString())
    expect(txInfo.children[8].children[1].innerHTML).toContain(`${oneTransactionMck.encodedLength} bytes`)
  })

  it('should show more information', async () => {
    const showMoreBtn = await screen.getByText('Show more')

    fireEvent.click(showMoreBtn)

    const txInfo = await screen.getByTestId('tbody')
    expect(txInfo.children[9].children[1].innerHTML).toContain(oneTransactionMck.tip.toString())
    expect(txInfo.children[10].children[1].innerHTML).toContain(oneTransactionMck.era)
    expect(txInfo.children[11].children[1].innerHTML).toContain(oneTransactionMck.args)
    expect(txInfo.children[12].children[1].innerHTML).toContain(oneTransactionMck.callIndex.toString())
    expect(txInfo.children[13].children[1].innerHTML).toContain(oneTransactionMck.decimals.toString())
    expect(txInfo.children[14].children[1].innerHTML).toContain(oneTransactionMck.ss58.toString())
    expect(txInfo.children[15].children[1].innerHTML).toContain(oneTransactionMck.tokens.toString())
    expect(txInfo.children[16].children[1].innerHTML).toContain(oneTransactionMck.type.toString())
    expect(txInfo.children[17].children[1].innerHTML).toContain(oneTransactionMck.version.toString())
  })

  it('should show Logs view', async () => {
    const logBtn = element.getElementsByClassName('transaction-tabs_buttons')[1]

    await act(() => {
      fireEvent.click(logBtn)
    })

    expect(element.innerHTML).toContain('Transaction Receipt Event Logs')
  })
})
