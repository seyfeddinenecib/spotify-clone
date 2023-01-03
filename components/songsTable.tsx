import { Box } from '@chakra-ui/layout'
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { formateDuration, formateDate } from '../lib/formatters'
import { useStoreActions } from 'easy-peasy'
const SongsTable = ({ songs }) => {
  const setActiveSongs = useStoreActions(
    (store: any) => store.changeActiveSongs
  )
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)

  const handlePlay = (activeSong?) => {
    setActiveSongs(songs)
    setActiveSong(activeSong || songs[0])
  }

  return (
    <Box bg="transparent">
      <Box padding="10px" marginBottom="20px">
        <Box paddingBottom="20px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            aria-label="play"
            colorScheme="green"
            size="lg"
            isRound
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead
            borderBottom="1px solid"
            borderColor="rgba(255,255,255,0.2)"
            textAlign="left"
          >
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => {
              return (
                <Tr
                  sx={{
                    transition: 'all .3s',
                    '&:hover': {
                      bg: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  key={song.id}
                  cursor="pointer"
                  onClick={() => handlePlay(song)}
                >
                  <Td>{i + 1}</Td>
                  <Td>{song.name}</Td>
                  <Td>{formateDate(song.createdAt)}</Td>
                  <Td>{formateDuration(song.duration)}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default SongsTable
