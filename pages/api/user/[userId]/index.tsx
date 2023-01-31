import {getUserById} from "@/lib/prisma/users";
import {NextApiRequest, NextApiResponse} from "next";
import {User} from "@prisma/client";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
            const {userId} = req.query
            const {user, error}: { user?: User | null, error?: any } = await getUserById(Number(userId))
            if (error) {
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({user})
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    } else if (req.method === "PUT") {
        const {id, blocked}: { id: number, blocked: boolean } = req.body
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                blocked: blocked,
            },
        })
        return res.status(200).json({user: user})
    }
}

export default handler
