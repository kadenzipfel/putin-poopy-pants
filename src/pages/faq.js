import React from 'react'
import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text
} from '@chakra-ui/react';

const config = [
  { question: 'foo', answer: 'bar' },
  { question: 'foo', answer: 'bar' },
  { question: 'foo', answer: 'bar' },
  { question: 'foo', answer: 'bar' },
  { question: 'foo', answer: 'bar' },
  { question: 'foo', answer: 'bar' },
  { question: 'foo', answer: 'bar' },
  { question: 'foo', answer: 'bar' },
  { question: 'foo', answer: 'bar' },
]

const FaqSection = () => (
  <Accordion style={{width: '80vw'}}>
    {config.map(({ question, answer }, index) => (
      <FaqItem question={question} answer={answer} key={index}/>
    ))}
  </Accordion>
)

const FaqItem = ({ question, answer }) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Text color="white">
            {question}
          </Text>
        </Box>
        <AccordionIcon color="white"/>
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Text color="white">
          {answer}
        </Text>
      </AccordionPanel>
    </AccordionItem>
  )
}

const Faq = () => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    height="100%"
    minHeight="100vh"
    bg="blue.900"
    pt={20}
  >
    <Text color='white'>FAQs</Text>
    <Flex>
      <FaqSection/>
    </Flex>
  </Flex>
)

export default Faq