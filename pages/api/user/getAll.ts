import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma";

export default async function getAll(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const users = await prisma.user.findMany()
        res.status(200).json({users: users})
    } else {
        res.status(400)
    }
}