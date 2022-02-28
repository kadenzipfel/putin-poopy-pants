import { Web3Provider } from '@ethersproject/providers'
import { BigNumber, Contract, ethers, Signer } from 'ethers'
import { TICKET, YIELD_SOURCE_PRIZE_POOL } from '../utils/constants'
import TicketAbi from './abis/TicketAbi.json'

class TicketService {
  contract: Contract
  provider: Web3Provider

  constructor(provider: Web3Provider) {
    const signer: Signer = provider.getSigner()
    this.contract = new ethers.Contract(TICKET, TicketAbi, provider).connect(
      signer
    )
    this.provider = provider
  }

  // READ FUNCTIONS
  // ==============

  balanceOf = async (account: string) => {
    const balance = await this.contract.balanceOf(account)
    return balance
  }

  // WRITE FUNCTIONS
  // ===============

  approvePrizePool = async (amount: string) => {
    const tx = await this.contract.approve(YIELD_SOURCE_PRIZE_POOL, amount)
    return tx
  }
}

export { TicketService }
