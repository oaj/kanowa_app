import {getUserById} from "@/lib/prisma/users";
import {NextApiRequest, NextApiResponse} from "next";
import {Role, User} from "@prisma/client";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
            const {userId} = req.query
            const {user, error}: { user?: User | null, error?: any } = await getUserById(Number(userId))
            console.log('handler.get - user', user)
            console.log('handler.get - error', error)
            if (error) {
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({user})
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    } else if (req.method === "PUT") {
        const {id, firstname, lastname, email, role}:
            { id: number, firstname: string, lastname: string, email: string, role: Role } = req.body

        console.log('id', id)
        console.log('firstname', firstname)
        console.log('lastname', lastname)
        console.log('email', email)
        console.log('role', role)

        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                role: role,
            },
        })
        return res.status(200).json({user: user})
    }
}

export default handler
