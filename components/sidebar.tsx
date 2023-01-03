import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Box,
  ListItem,
  List,
  ListIcon,
  Divider,
  Center,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/layout'
import { MdHome, MdSearch, MdLibraryMusic, MdFavorite } from 'react-icons/md'
import { usePlaylist } from '../lib/hooks'

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
]

const Sidebar = () => {
  const { playlists } = usePlaylist()

  return (
    <Box
      width="100%"
      height="calc(100vh - 80px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage width={120} height={60} src="/logo.svg" />
        </Box>
        <Box marginBottom="20px">
          <List spacing="2">
            {navMenu.map((item) => (
              <ListItem paddingX="20px" fontSize="16px" key={item.name}>
                <LinkBox>
                  <NextLink href={item.route} passHref>
                    <LinkOverlay>
                      <ListIcon as={item.icon} marginRight="20px" />
                      {item.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box marginBottom="20px" height={'60%'} overflowY="auto">
          <List spacing="2">
            {playlists.map((item) => (
              <ListItem paddingX="20px" fontSize="16px" key={item.id}>
                <LinkBox>
                  <NextLink href={`/playlist/${item.id}`} passHref>
                    <LinkOverlay>{item.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
