import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import prisma from './prisma'
import { User } from '@prisma/client'

export default function validateRoute(handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[process.env.ACCESS_TOKEN_COOKIE]
    if (token) {
      try {
        const { id } = verifyToken(token)
        var user = await prisma.user.findUnique({
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
export function verifyToken(token: string): User {
  const user = jwt.verify(token, process.env.TOKEN_SECRET)
  return user
}
