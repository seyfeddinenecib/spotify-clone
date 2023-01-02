import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import prisma from './prisma'

export default function validateRoute(handler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.access_token
    if (token) {
      try {
        const { id } = jwt.verify(token, 'hamza')
        var user = prisma.user.findUnique({
          where: {
            id,
          },
        })
        if (!user) throw Error()
      } catch (e) {
        res.status(401)
        res.json({ error: 'bad token' })
      }
      return handler(req, res, user)
    } else {
      res.status(401)
      res.json({ error: 'bad token' })
    }
  }
}
