import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

import prisma from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        email,
        id: user.id,
        time: Date.now(),
      },
      'hamza',
      { expiresIn: '8h' }
    )
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('access_token', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: '/',
        sameSite: 'lax',
      })
    )
    res.json(user)
  } else {
    res.status(404)
    res.json({ error: 'User not found' })
  }
}
