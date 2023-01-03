import '../styles/globals.css'
import 'reset-css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import PlayerLayout from '../components/playerLayout'
import { StoreProvider } from 'easy-peasy'
import { store } from '../lib/store'

const theme = extendTheme({
  colors: {
    gray: {
      100: '#f5f5f5',
      200: '#EEEEEE',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
  scrollbars: {
    width: '10px',
    height: '10px',
    backgroundColor: '#f5f5f5',
    thumb: {
      backgroundColor: 'red',
      borderRadius: '10px',
      '&:hover': {
        backgroundColor: '#555555',
      },
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        )}
      </StoreProvider>
    </ChakraProvider>
  )
}

export default MyApp
