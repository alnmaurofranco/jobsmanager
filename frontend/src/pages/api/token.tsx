import { NextApiRequest, NextApiResponse } from 'next';

export default async function token(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const cookie = req.cookies;

    const token = cookie

    return res.json({ message: token })
  }
}
