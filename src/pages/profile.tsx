import React, { useState, useEffect } from 'react'
import { Text, Flex, Box } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { useCoingeckoPrice } from '@usedapp/coingecko'

const Profile = () => {
  const [totalDonated, setTotalDonated] = useState(0)
  const etherPrice = useCoingeckoPrice('ethereum', 'usd')

  useEffect(() => {
    // TODO - add in real number here
    setTotalDonated(1)
  }, [])

  return (
    <Flex
      bg="blue.900"
      direction="column"
      width="100%"
      minHeight="100vh"
      justify="center"
      align="center"
    >
      <Text color="white" fontSize="4xl">
        uDai
      </Text>
      <Text color="white" fontSize="xl" mt={10}>
        Donate your yield to help Ukraine
      </Text>
      <Text color="white" fontSize="md" mt={10}>
        Additional Details
      </Text>
      <Button mt={10}>Deposit now</Button>
      <Button mt={10}>Harvest and Donate</Button>

      <Text color="white" fontSize="md" mt={10}>
        Total donated so far: {totalDonated * totalDonated} ETH / ~{etherPrice}{' '}
        DAI
      </Text>
    </Flex>
  )
}

export default Profile
