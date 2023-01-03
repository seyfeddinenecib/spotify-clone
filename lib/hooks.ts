import { User } from '@prisma/client'
import useSWR from 'swr'
import fetcher from './fetcher'

export const useMe = () => {
  const { data, error } = useSWR('/me', fetcher)
  return {
    isLoading: !data && !error,
    user: data,
    isError: error,
  }
}

export const usePlaylist = () => {
  const { data, error } = useSWR('/playlist', fetcher)
  return {
    isLoading: !data && !error,
    playlists: (data as any) || [],
    isError: error,
  }
}
