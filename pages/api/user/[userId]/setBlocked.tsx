import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma";

export default async function setBlocked(req: NextApiRequest, res: NextApiResponse) {
    const { id, blocked } : { id: number, blocked: boolean } = req.body
    if (req.method === 'PUT') {
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                blocked: blocked,
            },
        })
        res.status(200).json({user: user})
    } else {
        res.status(400)
    }
}