import { Box, Flex, Input, Button } from '@chakra-ui/react'
import { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { FC, FormEvent, useState } from 'react'
import { auth } from '../lib/mutations'
import signin from '../pages/signin'
import NextImage from 'next/image'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = function AuthForm({
  mode,
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const response = await auth(mode, {
      email,
      password,
    })

    setIsLoading(false)
  }

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="2px solid"
        borderColor="gray.900"
      >
        <NextImage src="/logo.svg" width="120px" height="80px" />
      </Flex>

      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box textAlign="right" padding="30px" borderRadius="10px" bg="gray.800">
          <form onSubmit={handleOnSubmit}>
            <Input
              marginBottom="10px"
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              marginBottom="10px"
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              isLoading={isLoading}
              bg="green.600"
              sx={{
                '&:hover': {
                  bg: 'green.400',
                },
              }}
              type="submit"
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
