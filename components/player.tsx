import ReactHowler from 'react-howler'
import { useStoreActions } from 'easy-peasy'
import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import {
  ButtonGroup,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react'
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'
import { MdLoop, MdShuffle, MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import { useState } from 'react'

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true)
  const [index, setIndex] = useState(0)
  const [seek, setSeek] = useState(0.0)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)

  const setPlayState = (value) => {
    setPlaying(value)
  }

  const onShuffle = () => {
    setShuffle((state) => !state)
  }

  const onRepeat = () => {
    setRepeat((state) => !state)
  }
  return (
    <Box width="100%">
      <Box>
        <ReactHowler playing={playing} src={activeSong?.url} />
      </Box>
      <Center>
        <ButtonGroup spacing="0">
          <IconButton
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            icon={<MdShuffle />}
          />
          <IconButton
            variant="link"
            aria-label="previous"
            fontSize="24px"
            icon={<MdSkipPrevious />}
          />
          {playing ? (
            <IconButton
              variant="link"
              color="white"
              aria-label="pause"
              fontSize="35px"
              icon={<AiFillPauseCircle />}
              onClick={() => setPlaying(false)}
            />
          ) : (
            <IconButton
              variant="link"
              color="white"
              aria-label="play"
              fontSize="35px"
              icon={<AiFillPlayCircle />}
              onClick={() => setPlaying(true)}
            />
          )}
          <IconButton
            variant="link"
            aria-label="next"
            fontSize="24px"
            icon={<MdSkipNext />}
          />
          <IconButton
            variant="link"
            aria-label="replay"
            fontSize="24px"
            icon={<MdLoop />}
          />
        </ButtonGroup>
      </Center>
      <Flex align="end" textAlign={'center'} justify="center">
        <Box width="10%">
          <Text fontSize="small">100</Text>
        </Box>
        <Box width="80%">
          <RangeSlider aria-label={['min', 'max']} step={0.1} min={0} max={300}>
            <RangeSliderTrack bg="gray.800">
              <RangeSliderFilledTrack bg="gray.500" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
          </RangeSlider>
        </Box>
        <Box width="10%" textAlign="right">
          <Text fontSize="small">300</Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default Player
