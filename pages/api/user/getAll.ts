import type { NextApiRequest, NextApiResponse } from 'next'
import index from "@/lib/prisma";

export default async function getAll(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const users = await index.user.findMany()
        res.status(200).json({users: users})
    } else {
        res.status(400)
    }
}