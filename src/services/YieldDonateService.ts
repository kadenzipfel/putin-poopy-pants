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

  balanceOf = async (address: string) => {
    const balance = await this.contract.balanceOf(address)
    return balance
  }

  totalDeployed = async () => {
    const total = await this.contract.totalUnderlyingDeployed()
    return total
  }

  isAcceptedDonationToken = async (token: string) => {
    const accepted = await this.contract.acceptedDonationTokens(token)
    return accepted
  }

  // WRITE FUNCTIONS
  // ===============

  deposit = async (
    sellToken: string,
    sellAmount: BigNumber,
    buyToken: string,
    target: string,
    minTokens: BigNumber
  ) => {
    try {
      // TODO: Add appropriate data
      const data = ''
      const tx = await this.contract.deposit(
        sellToken,
        sellAmount,
        buyToken,
        target,
        data,
        minTokens
      )
      return tx
    } catch (err) {
      throw new Error(err as string)
    }
  }

  withdraw = async (amount: BigNumber, account: string) => {
    try {
      const balance = await this.balanceOf(account)
      if (balance.lt(amount)) {
        console.warn('insufficient balance')
        return
      }
      const tx = await this.contract.withdraw(amount)
      return tx
    } catch (err) {
      throw new Error(err as string)
    }
  }
}

export { YieldDonateService }
