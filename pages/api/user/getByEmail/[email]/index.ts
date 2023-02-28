import {NextApiRequest, NextApiResponse} from "next";
import {User} from "@prisma/client";
import {getUserByEmail} from "@/lib/prisma/users";
import {IUser} from "@/types/user.type";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
            const {email} = req.query
            const {user, error}: { user?: IUser | null, error?: any } = await getUserByEmail(email as string)
            console.log('handler.getByEmail - user', user)
            console.log('handler.getByEmail - error', error)
            if (error) {
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({user})
        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    }
}

export default handler
