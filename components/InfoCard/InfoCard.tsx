import Binance, { AvgPriceResult } from 'binance-api-node'
import { get } from 'lodash'
import Image from 'next/future/image'
import { useState, useEffect } from 'react'
import time from '../../assets/img/bxs_time.svg'
import coin from '../../assets/img/ph_coin-vertical-fill.svg'
import { useGetLastBlockQuery, GetLastBlockQuery, useVersionQuery, VersionQuery } from '../../generated'
import { getTimeAgo } from '../../lib/utils'
import withApollo from '../../lib/withApollo'
import { useFormatIntl } from '../../hooks/useFormatIntl'

function InfoCard() {
  const { format } = useFormatIntl()
  const [price, setPrice] = useState(0)
  const { data } = useGetLastBlockQuery({ variables: { skip: 0, take: 1 } })
  const blocks = get(data, 'getBlocks', []) as GetLastBlockQuery['getBlocks']
  const { data: versionData } = useVersionQuery()
  const version = get(versionData, 'version', []) as VersionQuery['version']
  const token = 'DOT'

  useEffect(() => {
    const client = Binance()
    client
      .avgPrice({ symbol: `${token}USDT` })
      .then((res) => {
        const result = Number((res as AvgPriceResult).price)
        setPrice(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <div className="ink_infocard">
        <div className="ink_infocard-dot">
          <Image src={coin} alt="Icon" /> {token + `: $` + price}
        </div>
        <div className="ink_infocard-last">
          <Image src={time} alt="Icon" /> {format('lastest_block')}: {blocks[0]?.number} (
          {getTimeAgo(blocks[0]?.timestamp)})
        </div>
        <div className="ink_infocard-sdk">SDK: {version}</div>
      </div>
    </>
  )
}

export default withApollo(InfoCard)
