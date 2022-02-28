import { useState, useCallback } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button
} from '@chakra-ui/react'
import { VisuallyHidden } from '@chakra-ui/react'
type Props = {}

const EmailSignUp = (props: Props) => {
  const [input, setInput] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value)

  const handleSubmit = useCallback(() => {
    alert(input)
  }, [input])

  return (
    <FormControl>
      <VisuallyHidden>
        <FormLabel htmlFor="email">Email</FormLabel>
      </VisuallyHidden>
      <Input
        id="email"
        colorScheme="whiteAlpha"
        type="email"
        bg="whiteAlpha.300"
        size="lg"
        fontWeight="bold"
        value={input}
        borderWidth={1}
        borderColor="whiteAlpha.600"
        onChange={handleInputChange}
        _hover={{ borderColor: 'whiteAlpha.500' }}
        rounded="xl"
        placeholder="Enter your email to get the latest updates"
        _placeholder={{ color: 'whiteAlpha.600' }}
        _focus={{ boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.6)' }}
      />
      <Button
        size="lg"
        mt={4}
        bg="white"
        textColor="black"
        rounded="xl"
        isLoading={false}
        type="submit"
        onClick={handleSubmit}
      >
        Get notified
      </Button>
    </FormControl>
  )
}

export default EmailSignUp
