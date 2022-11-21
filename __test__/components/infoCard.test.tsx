import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import { blockMocks } from '../../_mocks/block-mocks'
import InfoCard from '../../components/InfoCard/InfoCard'
import { getTimeAgo } from '../../lib/utils'

const price = 30
const version = '1.0.3'

jest.mock('../../generated', () => ({
  useGetLastBlockQuery: jest.fn(() => {
    return {
      data: {
        getBlocks: blockMocks,
      },
    }
  }),
  useVersionQuery: jest.fn(() => {
    return {
      data: { version },
    }
  }),
}))

jest.mock('binance-api-node', () => {
  return {
    __esModule: true,
    default: () => ({
      avgPrice: jest.fn().mockResolvedValue({
        price,
      }),
    }),
  }
})

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    locale: 'en',
  })),
}))

jest.mock('../../hooks/useFormatIntl', () => ({
  useFormatIntl: jest.fn(() => ({
    format: jest.fn(() => 'Latest Block'),
  })),
}))

describe('InfoCard', () => {
  it('show render', async () => {
    const token = 'DOT'

    const { container } = render(<InfoCard />)

    const tokenElement = container?.getElementsByClassName('ink_infocard-dot')[0]
    const lastBlockElement = container?.getElementsByClassName('ink_infocard-last')[0]
    const sdkVersionElement = container?.getElementsByClassName('ink_infocard-sdk')[0]

    await waitFor(() => expect(tokenElement?.innerHTML).toContain(token + `: $` + price))
    await waitFor(() =>
      expect(lastBlockElement?.innerHTML).toContain(
        `Latest Block: ${blockMocks[0]?.number} (${getTimeAgo(blockMocks[0]?.timestamp)})`,
      ),
    )
    await waitFor(() => expect(sdkVersionElement.innerHTML).toContain(`SDK: ${version}`))
  })
})
