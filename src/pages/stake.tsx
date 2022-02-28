import { Button } from '@chakra-ui/button'
import { Box, Flex, HStack, Text, Grid, GridItem } from '@chakra-ui/layout'
import { formatEther } from 'ethers/lib/utils'
import { useWallet } from '../context/wallet-provider'
import { shorten } from '../utils/shorten'
import {
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  MenuList,
  MenuItem,
  Menu,
  MenuButton
} from '@chakra-ui/react'
import Davatar from '@davatar/react'
import { ChevronDownIcon, LoginIcon } from '@heroicons/react/outline'
import { Root } from '../components/Root'
import { useState } from 'react'
import { TokenList, schema } from '@uniswap/token-lists'
import CoinList from '../assets/tokenlist.json'
import { random } from 'lodash'

const Tokens = CoinList.tokens
const assetList = ['WETH', 'WBTC', 'USDC', 'USDT', 'DAI']
const TokenSymbols = Tokens.reduceRight((prev: any, { symbol, logoURI }) => {
  if (assetList.includes(symbol)) {
    prev[symbol] = logoURI
  }
  return prev
}, {})

enum DepositMode {
  WITHDRAW,
  DEPOSIT
}

interface Props {
  mode: DepositMode
}

export default function Deposit() {
  const { activateBrowserWallet, ens, account, etherBalance } = useWallet()

  const [stakingMode, setStakingMode] = useState<DepositMode>(
    DepositMode.DEPOSIT
  )

  function tabChanged() {
    if (stakingMode === DepositMode.WITHDRAW) {
      setStakingMode(DepositMode.DEPOSIT)
    } else {
      setStakingMode(DepositMode.WITHDRAW)
    }
  }

  return (
    <SimpleGrid
      columns={{
        base: 2,
        lg: 2,
        md: 1,
        sm: 1
      }}
      spacing={10}
    >
      <Flex flexDirection="column" align="center" justify="center" width="50vw">
        <RedeemSwitch onChange={tabChanged} />
        <DepositBox mode={stakingMode}>
          <BoxDepositBox />
          {stakingMode === DepositMode.DEPOSIT ? (
            <>
              <Button
                _hover={{ color: 'black', background: 'white' }}
                backgroundColor="#06927b"
                color="white"
                width="455px"
                height="80px"
              >
                <Text fontSize="3xl"> Stake </Text>
              </Button>
            </>
          ) : (
            <>
              <Button
                _hover={{ color: 'black', background: 'white' }}
                backgroundColor="#06927b"
                color="white"
                width="455px"
                height="80px"
              >
                <Text fontSize="3xl"> Unstake </Text>
              </Button>

              <Button
                _hover={{ color: 'black', background: 'white' }}
                backgroundColor="#FFF"
                color="white"
                width="455px"
                height="80px"
              >
                <Text fontSize="3xl" color="#000">
                  {' '}
                  Donate Principal{' '}
                </Text>
              </Button>
            </>
          )}
        </DepositBox>

        <YourDeposits />
      </Flex>
      <Flex flexDirection="column" align="center" justify="center">
        <DetailsBox mode={stakingMode} />
      </Flex>

      <Flex flexDirection="column" align="center" justify="center"></Flex>
      <Flex flexDirection="column" align="end">
        <Text color="white" fontSize="30px">
          Looking to donate instead?
        </Text>

        <Text color="white" fontSize="30px">
          <a href="#">link to donate</a>
        </Text>
      </Flex>
    </SimpleGrid>
  )
}

const DetailsBox = (props: Props) => (
  <Flex flexDirection="column" align="left" justify="center" width="100%">
    <Flex
      justify="space-between"
      gap="18px"
      marginBottom="60px"
      flexDirection={{
        base: 'column',
        lg: 'row'
      }}
    >
      <Box
        borderRadius="25px"
        background="rgba(0, 0, 0, 0.2)"
        width="100%"
        padding="20px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        alignContent="center"
      >
        <Text color="white" fontSize="50px">
          $6.55m
        </Text>
        <Text color="white" fontSize="24px">
          Total Value Donating
        </Text>
      </Box>
      <Box
        borderRadius="25px"
        background="rgba(0, 0, 0, 0.2)"
        width="100%"
        padding="20px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        alignContent="center"
      >
        <Text color="white" fontSize="50px">
          $6.55m
        </Text>
        <Text color="white" fontSize="24px">
          Total Value Donating
        </Text>
      </Box>
    </Flex>
    <Text color="white" fontSize="30px">
      {props.mode === DepositMode.DEPOSIT
        ? `Get your yield on. Degen for a good cause.\n
        [insert copy in terms of yield to donate passive feeder collecting yields
          as they are being harvested to funnel into ukraine]\n
          Join the movement: deposit, yield, support!
          `
        : `Withdraw the exact amount of assets that you deposited`}
    </Text>
  </Flex>
)

const RedeemSwitch = ({ onChange }: { onChange: () => void }) => (
  <Tabs
    variant="soft-rounded"
    backgroundColor={'white'}
    borderRadius="25px"
    width="524px"
    marginBottom="20px"
    onChange={onChange}
  >
    <TabList>
      <Tab width="262px" _selected={{ color: 'white', bg: '#027DFF' }}>
        {' '}
        Stake{' '}
      </Tab>
      <Tab width="262px" _selected={{ color: 'white', bg: '#027DFF' }}>
        {' '}
        Unstake{' '}
      </Tab>
    </TabList>
  </Tabs>
)

type DepositBoxProps = {
  children: React.ReactNode
  mode: DepositMode
}

const DepositBox = ({ children, mode }: DepositBoxProps) => (
  <Box
    borderRadius="25px"
    background="rgba(0, 0, 0, 0.2)"
    width="524px"
    height="423px"
    padding="20px"
    display="flex"
    flexDirection="column"
    alignItems="center"
    alignContent="center"
    justifyContent="space-around"
  >
    <Box width="100%">
      <Text color="white" fontSize="48px" float="left">
        {' '}
        {mode === DepositMode.DEPOSIT ? 'Stake' : 'Unstake'}{' '}
      </Text>
    </Box>

    {children}
  </Box>
)

const BoxDepositBox = () => (
  <Box
    backgroundColor="rgba(255,255,255,0.2)"
    width="455px"
    height="140px"
    borderRadius="20px"
    display="flex"
    flexDirection="row"
    alignItems="center"
    justifyContent="space-around"
  >
    <Box color="white">
      <Text fontSize="36px">0.05</Text>
      <Text color="#DADADA"> balance: 0.02</Text>
    </Box>

    <Box color="white">
      <AssetMenu />
    </Box>
  </Box>
)

enum Assets {
  eth = 'WETH',
  usdc = 'USDC',
  usdt = 'USDT',
  dai = 'DAI',
  btc = 'WBTC'
}

const eth_2_assets = {
  WETH: { text: 'WETH', symbol: './' },
  USDC: { text: 'USDC', symbol: './' },
  USDT: { text: 'USDT', symbol: './' },
  DAI: { text: 'DAI', symbol: './' },
  WBTC: { text: 'WBTC', symbol: './' }
}

const AssetMenu = () => {
  const [selected, select] = useState<Assets>(Assets.eth)

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            _active={{ bg: '5c8abc' }}
            _hover={{ bg: '#5c8abc' }}
            _focus={{ bg: '#5c8abc' }}
            display="flex"
            justifyContent="space-around"
            width="150px"
            alignItems="center"
            backgroundColor="#5c8abc"
            isActive={isOpen}
            as={Button}
          >
            <Box
              width="100%"
              height="100%"
              display="flex"
              justifyContent="space-around"
              alignContent="center"
            >
              <img src={TokenSymbols[selected]} alt={selected} width="20%" />

              {eth_2_assets[selected].text}

              <ChevronDownIcon width="25px" />
            </Box>
          </MenuButton>

          <MenuList
            backgroundColor="#5c8abc"
            _active={{ bg: '5c8abc' }}
            _focus={{ bg: '#5c8abc' }}
          >
            {Object.values(Assets).map((val) => (
              <MenuItem
                _focus={{ bg: '#5c8abc' }}
                _active={{ bg: '5c8abc' }}
                _hover={{ bg: '#5c8abc' }}
                onClick={(_) => select(val)}
              >
                {' '}
                {val}{' '}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  )
}

const YourDeposits = () => (
  <Box width="524px">
    <Text fontSize="36px" color="white">
      {' '}
      Your Deposits{' '}
    </Text>

    <Flex flexDirection={'row'} wrap="wrap" gap={4}>
      {Object.values(Assets).map((asset: string) => (
        <Flex
          backgroundColor="#004B9B"
          width="160px"
          height="101px"
          padding="10px"
          borderRadius="5px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Text fontWeight="bold" fontSize="36px" color="white">
            {(Math.random() * 100).toFixed(2)}
          </Text>
          <Text fontSize="16px" color="white">
            {asset}
          </Text>
        </Flex>
      ))}
    </Flex>
  </Box>
)