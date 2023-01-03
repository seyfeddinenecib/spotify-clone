import GradientLayout from '../../components/gradientLayout'
import prisma from '../../lib/prisma'
import { verifyToken } from '../../lib/auth'
import SongsTable from '../../components/songsTable'
const playlist = ({ playlist }) => {
  return (
    <GradientLayout color="red">
      <div>
        <SongsTable songs={playlist.songs} />
      </div>
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  const { id } = verifyToken(req.cookies.access_token)
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: parseInt(query.id),
      userId: id,
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
  console.log(playlist)
  return {
    props: { playlist },
  }
}

export default playlist
