import { Flex, Spacer, Text, Box, Button } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { ChevronRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'

const Explore = () => {
  return (
    <Box
      height="80vh"
      width="80%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box
        display="flex"
        alignSelf="flex-start !important"
        flexDirection="column"
        width="100%"
        height="20%"
      >
        <Text color="white" fontSize="5vh">
          Explore NFTs
        </Text>
        <Spacer />

        <NFTsNavBar />
        <Divider size="xl" color="white" />
      </Box>

      <Box height="70%">
        <NFTDisplay />
      </Box>
    </Box>
  )
}

export default Explore

const NFTsNavBar = () => {
  return (
    <Flex direction="column" width="100%" color="white">
      <Flex width="60%" justifyContent="space-between">
        <LinkButton title="Collection" number={321} />
        <LinkButton title="Artists" number={122} />
        <LinkButton title="Recent" number={123} />
      </Flex>
    </Flex>
  )
}

const LinkButton = ({ title, number }: { title: string; number: number }) => {
  return (
    <Link href={'/hey'}>
      <Flex
        direction="row"
        fontSize="3vh"
        flexBasis="25%"
        _hover={{ cursor: 'pointer' }}
      >
        <Text pr="3">{title}</Text>
        <Text opacity={0.6}>{number}</Text>
      </Flex>
    </Link>
  )
}

const NFTDisplay = () => {
  return (
    <Box width="30%" height="60%" color="white">
      <Flex direction="column" justifyContent="space-between" height="100%">
        <Text color="white" fontSize="3vh">
          Collection Name
        </Text>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil dicta
          odio quos culpa modi ad excepturi minus ipsam. Optio rem quam corrupti
          consectetur, illum assumenda ea nesciunt ipsum. Obcaecati, modi.
        </Text>
        <Button
          size="md"
          width="55%"
          height="17%"
          colorScheme="yellow"
          borderRadius="17px"
          display="flex"
          justifyContent="space-around"
        >
          View Collection <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </Flex>
    </Box>
  )
}
