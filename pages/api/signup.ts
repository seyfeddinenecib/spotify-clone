import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const salt = bcrypt.genSaltSync()
  const { email, password, firstName, lastName } = req.body
  try {
    var user = await prisma.user.create({
      data: {
        email: email,
        password: bcrypt.hashSync(password, salt),
      },
    })
  } catch (e) {
    res.status(401)
    res.send({ error: 'User already exists', message: e.message })
  }
  const token = await jwt.sign(
    { email, id: user.id, time: Date.now() },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '8h',
    }
  )
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(process.env.ACCESS_TOKEN_COOKIE, token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      sameSite: 'lax',
    })
  )
  res.json(user)
}
