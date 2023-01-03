import { Box, Text, Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import Head from 'next/head'
import GradientLayout from '../components/gradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'
import styles from '../styles/Home.module.css'

export default function Home({ artists }) {
  const { user } = useMe()
  return (
    <GradientLayout
      color="telegram"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlists} public playlists`}
      image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
      roundImage
    >
      <Box paddingX="40px">
        <Box marginBottom="30px">
          <Text fontSize="2xl">Top artists this month</Text>
          <Text fontSize="small">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingRight="20px" width="19%">
              <Box bg="gray.900" padding="20px" borderRadius="8px" width="100%">
                <Image
                  boxShadow="dark-lg"
                  src="https://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box paddingTop="10px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  let artists = await prisma.artist.findMany({})
  return {
    props: {
      artists,
    },
  }
}
