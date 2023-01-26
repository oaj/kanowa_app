import type { NextApiRequest, NextApiResponse } from 'next'

export default function login (req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body
  console.log('username', username)
  console.log('password', password)

  if (req.method === 'POST') {
    res
      .status(200)
      .json({ username: 'Ola Anker Jørgensen', email: 'oaj@amfibia.dk' })
  } else {
    res.status(400)
  }
}
