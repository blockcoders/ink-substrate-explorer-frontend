import { ApiPromise, WsProvider } from '@polkadot/api'
import { Abi, ContractPromise } from '@polkadot/api-contract'

export const useSendingTx = () => {
  const connect = async (provider: string | string[] | undefined) => {
    return ApiPromise.create({ provider: new WsProvider(provider) })
  }

  const getContractInstance = (api: ApiPromise, abi: Abi, address: string, method: string) => {
    const contractPromise = new ContractPromise(api, abi, address)
    const query = contractPromise.query[method]
    const tx = contractPromise.tx[method]

    return {
      query,
      tx,
    }
  }

  return {
    connect,
    getContractInstance,
  }
}
