import { Contract, Wallet, ethers, BigNumber } from 'ethers'
import { TransactionReceipt } from '@ethersproject/providers'

import abi from './abis/YieldSourcePrizePoolAbi.json'
import {
  UKRAINE_DONATE_ADDRESS,
  YIELD_SOURCE_PRIZE_POOL
} from '../utils/constants'

class PrizePoolService {
  provider: any
  contract: Contract

  constructor(provider: any, signerAddress?: string) {
    this.provider = provider
    if (signerAddress) {
      const signer: Wallet = provider.getSigner()
      this.contract = new ethers.Contract(
        YIELD_SOURCE_PRIZE_POOL,
        abi,
        provider
      ).connect(signer)
    } else {
      this.contract = new ethers.Contract(
        YIELD_SOURCE_PRIZE_POOL,
        abi,
        provider
      )
    }
  }

  // READ FUNCTIONS
  // ==============

  // WRITE FUNCTIONS
  // ===============
  deposit = async (
    account: string,
    amount: BigNumber
  ): Promise<TransactionReceipt> => {
    const tx = await this.contract.depositToAndDelegate(
      account,
      amount,
      UKRAINE_DONATE_ADDRESS
    )
    return tx
  }

  withdraw = async (
    account: string,
    amount: BigNumber
  ): Promise<TransactionReceipt> => {
    const tx = await this.contract.withdrawFrom(account, amount)
    return tx
  }
}

export { PrizePoolService }
