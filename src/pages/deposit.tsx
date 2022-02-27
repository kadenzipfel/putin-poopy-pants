import { Button } from '@chakra-ui/button'
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout'
import { formatEther } from 'ethers/lib/utils'
import { useWallet } from '../context/wallet-provider'
import { shorten } from '../utils/shorten'
import Davatar from '@davatar/react'

export default function Deposit() {
  const { activateBrowserWallet, ens, account, etherBalance } = useWallet()
  return (
    <Box>
      <HStack
        borderWidth={1}
        shadow="sm"
        justifyContent="space-between"
        px={10}
        py={4}
      >
        <Box fontWeight="bold" fontSize={34}>
          uDai
        </Box>
        <Button onClick={activateBrowserWallet} padding={0} rounded="md">
          {account ? (
            <Flex alignItems="center">
              <Box>
                <Text paddingX={3}>
                  {parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
                </Text>
              </Box>
              <Flex
                alignItems="center"
                gap={2}
                bg="gray.200"
                paddingY={1}
                paddingX={2}
                marginRight={1}
                rounded="md"
              >
                <Box>
                  <Davatar size={25} address={account} />
                </Box>
                <Text>{ens || shorten(account)}</Text>
              </Flex>
            </Flex>
          ) : (
            <Text paddingX={4}>Connect to wallet</Text>
          )}
        </Button>
      </HStack>
    </Box>
  )
}
