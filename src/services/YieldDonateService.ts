import { Web3Provider } from '@ethersproject/providers'
import { BigNumber, Contract, ethers, Signer } from 'ethers'
import { YIELD_DONATE_CONTRACT } from '../utils/constants'
import { YieldDonateAbi as abi } from './abis/YieldDonateAbi'

class YieldDonateService {
  contract: Contract
  provider: Web3Provider

  constructor(provider: Web3Provider) {
    const signer: Signer = provider.getSigner()
    this.contract = new ethers.Contract(
      YIELD_DONATE_CONTRACT,
      abi,
      provider
    ).connect(signer)
    this.provider = provider
  }

  // READ FUNCTIONS
  // ==============

  // WRITE FUNCTIONS
  // ===============

  // TODO: Update to actual contract interface
  deposit = async (
    sellToken: string,
    buyToken: string,
    vault: string,
    minTokens: BigNumber,
    calldata: string
  ) => {
    try {
      const tx = await this.contract.deposit(
        sellToken,
        buyToken,
        vault,
        minTokens,
        calldata
      )
      return tx
    } catch (err) {
      throw new Error(err as string)
    }
  }

  // TODO: Update to actual contract interface
  withdraw = async (
    sellToken: string,
    buyToken: string,
    vault: string,
    minTokens: BigNumber,
    calldata: string
  ) => {
    try {
      const tx = await this.contract.withdraw(
        sellToken,
        buyToken,
        vault,
        minTokens,
        calldata
      )
      return tx
    } catch (err) {
      throw new Error(err as string)
    }
  }
}

export { YieldDonateService }
