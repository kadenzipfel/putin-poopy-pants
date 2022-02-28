import React from 'react'
import {
  useNumberInput,
  HStack,
  Image,
  Input,
  IconButton
} from '@chakra-ui/react'

type Props = {
  onChange: (value: number) => void
}

export const InputNumber = ({ onChange }: Props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 100,
      precision: 0,
      focusInputOnChange: false,
      onChange: (stringVal, numVal) => onChange(numVal)
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <HStack
      maxW="190px"
      background="whiteAlpha.400"
      p="12px"
      style={{ borderRadius: 16 }}
    >
      <IconButton
        {...dec}
        aria-label="Decrement"
        bg="transparent"
        _hover={{ bg: 'whiteAlpha.400' }}
        icon={
          <Image
            height="24px"
            width="24px"
            src="/icons/minus.svg"
            alt="Decrement"
          />
        }
      />
      <Input
        {...input}
        border={0}
        bg="transparent"
        fontWeight="bold"
        textAlign="center"
        fontSize="24px"
      />
      <IconButton
        {...inc}
        bg="transparent"
        aria-label="Increment"
        _hover={{ bg: 'whiteAlpha.400' }}
        icon={
          <Image
            display="block"
            height="24px"
            width="24px"
            src="/icons/plus.svg"
            alt="Decrement"
          />
        }
      />
    </HStack>
  )
}
