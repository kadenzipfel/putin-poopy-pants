import { Web3Provider } from '@ethersproject/providers'
import { Contract, ethers, Signer } from 'ethers'
import { YIELD_DONATE_CONTRACT } from '../utils/constants'
import { YieldDonateAbi as abi } from './abis/YieldDonateAbi'

class YieldDonateService {
  contract: Contract
  provider: Web3Provider

  constructor(provider: Web3Provider, signerAddress: string) {
    const signer: Signer = provider.getSigner()
    this.contract = new ethers.Contract(
      YIELD_DONATE_CONTRACT,
      abi,
      provider
    ).connect(signer)
    this.provider = provider
  }
}

export { YieldDonateService }
