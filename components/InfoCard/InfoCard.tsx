import Binance, { AvgPriceResult } from 'binance-api-node'
import { get } from 'lodash'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import time from '../../assets/img/bxs_time.svg'
import coin from '../../assets/img/ph_coin-vertical-fill.svg'
import { useGetLastBlockQuery, GetLastBlockQuery, useVersionQuery, VersionQuery } from '../../generated'
import { useGetSyncQuery } from '../../generated/index'
import { useFormatIntl } from '../../hooks/useFormatIntl'
import { getTimeAgo } from '../../lib/utils'
import withApollo from '../../lib/withApollo'

function InfoCard() {
  const { format } = useFormatIntl()
  const { locale } = useRouter()
  const [price, setPrice] = useState(0)
  const { data } = useGetLastBlockQuery({ variables: { skip: 0, take: 1 } })
  const blocks = get(data, 'getBlocks', []) as GetLastBlockQuery['getBlocks']
  const { data: versionData } = useVersionQuery()
  const { data: syncData, refetch } = useGetSyncQuery()
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncingFromBlock, setSyncingFromBlock] = useState(0)
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

  useEffect(() => {
    if (syncData) {
      const data = syncData.getSync
      if (!syncingFromBlock) setSyncingFromBlock(syncData?.getSync?.lastSynced)

      if (data?.status) {
        if (data?.status?.toLocaleLowerCase().includes('syncing') && syncingFromBlock) {
          setIsSyncing(true)
          toast.info(`${format('syncing')} ${syncingFromBlock}...`, {
            position: 'bottom-right',
            isLoading: true,
            closeButton: false,
            draggable: false,
            autoClose: false,
            closeOnClick: false,
            toastId: 'syncing',
          })

          setTimeout(() => {
            refetch()
          }, 60000)
        } else if (isSyncing) {
          toast.dismiss()
          toast.success(format('all_block_synced'), {
            position: 'bottom-right',
            closeOnClick: false,
            toastId: 'synced',
          })
        }
      }
    }
  }, [syncData, syncingFromBlock])

  return (
    <>
      <div className="ink_infocard">
        <div className="ink_infocard-dot">
          <Image src={coin} alt="Icon" /> {token + `: $` + price}
        </div>
        <div className="ink_infocard-last">
          <Image src={time} alt="Icon" /> {format('lastest_block')}: {blocks[0]?.number} (
          {getTimeAgo(blocks[0]?.timestamp, locale)})
        </div>
        <div className="ink_infocard-sdk">SDK: {version}</div>
      </div>
    </>
  )
}

export default withApollo(InfoCard)
