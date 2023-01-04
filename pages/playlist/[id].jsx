import GradientLayout from '../../components/gradientLayout'
import prisma from '../../lib/prisma'
import { verifyToken } from '../../lib/auth'
import SongsTable from '../../components/songsTable'

const playlist = ({ playlist }) => {
  return (
    <GradientLayout
      color={generateBGColor(playlist.id)}
      title={playlist.name}
      subtitle={'playlist'}
      description={`this playlist has ${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <div>
        <SongsTable songs={playlist.songs} />
      </div>
    </GradientLayout>
  )
}

const generateBGColor = (id) => {
  const colors = [
    'orange',
    'blue',
    'telegram',
    'teal',
    'green',
    'gray',
    'purple',
    'pink',
    'yellow',
  ]
  return colors[(id - 1) % colors.length]
}

export const getServerSideProps = async ({ query, req }) => {
  let user
  try {
    user = verifyToken(req.cookies[process.env.ACCESS_TOKEN_COOKIE])
  } catch (e) {
    return {
      path: '/signin',
    }
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: parseInt(query.id),
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })
  return {
    props: { playlist },
  }
}

export default playlist
