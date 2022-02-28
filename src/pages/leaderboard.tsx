import type { NextPage } from 'next'
import { useTranslation } from '../utils/use-translation'
import { Heading, Flex, Box } from '@chakra-ui/layout'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Stat,
  StatNumber,
  StatHelpText,
  Divider
} from '@chakra-ui/react'
import { SetStateAction, useEffect, useState } from 'react'
import axios from 'axios'

const localisation = {
  en: {
    title: 'Leaderboard'
  },
  fr: {
    title: 'Classement'
  }
}

const RECEIVER_WALLET = '0x10E1439455BD2624878b243819E31CfEE9eb721C'

const Leaderboard: NextPage = () => {
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)
  const translate = useTranslation(localisation)

  useEffect(() => {
    axios
      .post(
        'https://eth-mainnet.alchemyapi.io/v2/06iuz9tXgQRzmTQ1B28oqPnz5lQDQ-YO',
        {
          jsonrpc: '2.0',
          id: 0,
          method: 'alchemy_getAssetTransfers',
          params: [
            {
              fromBlock: '0x0',
              toBlock: 'latest',
              toAddress: RECEIVER_WALLET,
              excludeZeroValue: true,
              category: ['external']
            }
          ]
        }
      )
      .then((response) => {
        filterTransactionsLowToHigh(response?.data?.result?.transfers)
        setLoading(false)
      })
  }, [])

  const filterTransactionsLowToHigh = (arrayOfTransactions: {
    sort: (
      arg0: (a: { value: number }, b: { value: number }) => number
    ) => SetStateAction<never[]>
  }) => {
    setLeaders(
      arrayOfTransactions?.sort(
        (a: { value: number }, b: { value: number }) => b?.value - a?.value
        // @ts-ignore
      )
    )
  }

  return (
    <Flex
      direction="row"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Box
          width="80vw"
          backgroundColor="#0855A6"
          borderRadius="20px"
          padding="40px"
          mb="100px"
        >
          <Heading color="#fff" fontWeight="bold" fontSize="48">
            {translate('title')}
          </Heading>
          <Divider />
          {loading ? (
            <Box mt="20px" mb="20px" textAlign="center">
              <Spinner color="white" />
            </Box>
          ) : (
            <Table variant="striped" colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th />
                  <Th />
                  <Th isNumeric />
                </Tr>
              </Thead>
              <Tbody>
                {leaders?.map((data: { from: string; value: number }, i) => (
                  <Tr key={i}>
                    <Td color="white">
                      <Stat>
                        <StatNumber>#{i + 1}</StatNumber>
                        <StatHelpText>{` `}</StatHelpText>
                      </Stat>
                    </Td>
                    <Td color="white">
                      <Stat>
                        <StatNumber>{data?.from}</StatNumber>
                      </Stat>
                    </Td>
                    <Td isNumeric color="white">
                      <Stat>
                        <StatNumber>Ξ {data?.value.toFixed(4)}</StatNumber>
                        <StatHelpText>Donated</StatHelpText>
                      </Stat>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>
    </Flex>
  )
}

export default Leaderboard
