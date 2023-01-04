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
import { useEffect, useRef, useState } from 'react'
import { formateDuration } from '../lib/formatters'

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true)
  const [seek, setSeek] = useState(0.0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)
  const repeatRef = useRef(repeat)
  const shuffleRef = useRef(shuffle)
  const soundRef = useRef(null)

  const setPlayState = (value) => {
    setPlaying(value)
  }

  const onShuffle = () => {
    setShuffle((state) => !state)
  }

  const onRepeat = () => {
    setRepeat((state) => !state)
  }

  const updateSong = (next?) => {
    let current = songs.indexOf(activeSong)
    if (shuffleRef.current) {
      let newSong = Math.floor(Math.random() * songs.length)
      console.log(newSong, newSong === current)
      if (newSong === current) return updateSong(next)
      return setActiveSong(songs[newSong])
    }
    if (next) {
      setActiveSong(
        current === songs.length - 1 ? songs[0] : songs[current + 1]
      )
    } else {
      setActiveSong(
        current === 0 ? songs[songs.length - 1] : songs[current - 1]
      )
    }
    setSeek(0)
  }

  useEffect(() => {
    repeatRef.current = repeat
  }, [repeat])

  useEffect(() => {
    shuffleRef.current = shuffle
  }, [shuffle])

  // we use repeatRef because of a closure problem (stuck in closure)
  // this happens because if we just use repeat the value inside this function of repeat will not
  // change this problem happens also with : hooks that have event callbacks
  // google : react hooks closure problem
  const onEnd = () => {
    if (repeatRef.current) {
      soundRef.current.seek(0)
      setSeek(0)
    } else {
      updateSong(true)
    }
  }
  const onLoad = () => {
    const songDuration = soundRef.current.duration()
    setDuration(songDuration)
  }

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]))
    soundRef.current.seek(e[0])
  }

  useEffect(() => {
    let timerId
    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek())
        timerId = requestAnimationFrame(f)
      }
      timerId = requestAnimationFrame(f)
      return () => cancelAnimationFrame(timerId)
    }
    cancelAnimationFrame(timerId)
  }, [playing, isSeeking])

  return (
    <Box width="100%">
      <Box>
        <ReactHowler
          onLoad={onLoad}
          onEnd={onEnd}
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
        />
      </Box>
      <Center>
        <ButtonGroup spacing="0">
          <IconButton
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            color={shuffle ? 'white' : ''}
            icon={<MdShuffle />}
            onClick={() => setShuffle((prev) => !prev)}
          />
          <IconButton
            variant="link"
            aria-label="previous"
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={() => updateSong()}
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
            onClick={() => updateSong(true)}
          />
          <IconButton
            color={repeat ? 'white' : ''}
            variant="link"
            aria-label="replay"
            fontSize="24px"
            onClick={() => {
              setRepeat((prev) => {
                let a = !prev
                console.log(a)
                return a
              })
            }}
            icon={<MdLoop />}
          />
        </ButtonGroup>
      </Center>
      <Flex textAlign={'center'} justify="center">
        <Box width="10%">
          <Text fontSize="small">{formateDuration(seek)}</Text>
        </Box>
        <Box width="80%">
          <RangeSlider
            aria-label={['min', 'max']}
            step={0.1}
            min={0}
            max={duration ? parseFloat(duration.toFixed(2)) : 0}
            onChange={onSeek}
            value={[seek]}
            onChangeStart={() => setIsSeeking(true)}
            onChangeEnd={() => setIsSeeking(false)}
          >
            <RangeSliderTrack bg="gray.800">
              <RangeSliderFilledTrack bg="gray.500" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
          </RangeSlider>
        </Box>
        <Box width="10%">
          <Text fontSize="small">{formateDuration(activeSong.duration)}</Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default Player
