import {getUserById} from "@/lib/prisma/users";
import {NextApiRequest, NextApiResponse} from "next";
import {Role, User} from "@prisma/client";
import prisma from "@/lib/prisma";
import index from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
            const users = await index.user.findMany()
            res.status(200).json({users: users})
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    } else if (req.method === "POST") {
        const {firstname, lastname, email, role}:
            { firstname: string, lastname: string, email: string, role: Role } = req.body

        console.log('POST')
        console.log('firstname', firstname)
        console.log('lastname', lastname)
        console.log('email', email)
        console.log('role', role)

        try {
            const user = await prisma.user.create({
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    role: role,
                },
            })
            return res.status(200).json({user: user})
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    }
}

export default handler
