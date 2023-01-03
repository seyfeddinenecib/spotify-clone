import { Box, Flex, Text, Image } from '@chakra-ui/react'
import { FC } from 'react'

const GradientLayout: FC<{
  color: string
  children: any
  image?: string
  title?: string
  subtitle?: string
  description?: string
  roundImage?: boolean
}> = ({ color, children, image, title, subtitle, description, roundImage }) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 15%, ${color}.600 33%, ${color}.800 50%, rgba(0,0,0,0.96) 83%)`}
      color="white"
    >
      <Flex
        padding="40px"
        align="end"
        bg={`${color}.500`}
        bgGradient={`linear(to-t,${color}.700 35%, ${color}.500 90%)`}
      >
        <Box padding="20px 20px 0 0" minWidth="fit-content">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? '100%' : '3px'}
          />
        </Box>
        <Box padding="20px" lineHeight="40px">
          <Text fontSize="x-small" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="sm" fontWeight="100">
            {description}
          </Text>
        </Box>
      </Flex>
      <Box paddingY="40px">{children}</Box>
    </Box>
  )
}

export default GradientLayout
