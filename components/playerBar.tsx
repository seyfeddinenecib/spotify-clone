import { Box, Flex, Text } from '@chakra-ui/layout'
import Player from './player'
import { useStoreState } from 'easy-peasy'

const PlayerBar = () => {
  const activeSong = useStoreState((state: any) => state.activeSong)
  const songs = useStoreState((state: any) => state.activeSongs)
  return (
    <Box height="80px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center">
        {activeSong ? (
          <Box color="white" padding="5px" width="30%">
            <Text>{activeSong.name}</Text>
            <Text>{activeSong.artist.name}</Text>
          </Box>
        ) : null}
        {activeSong ? (
          <Box width="40%">
            <Player activeSong={activeSong} songs={songs} />
          </Box>
        ) : null}
        <Box></Box>
      </Flex>
    </Box>
  )
}
export default PlayerBar
