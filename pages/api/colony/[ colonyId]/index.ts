import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";
import {IUser} from "@/types/user.type";
import * as assert from "assert";
import {registerColony, saveColony} from "@/lib/services/colonyService";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // if (req.method === "GET") {
    //     try {
    //         const {userId} = req.query
    //         const {user, error}: { user?: User | null, error?: any } = await getUserById(Number(userId))
    //         console.log('handler.get - user', user)
    //         console.log('handler.get - error', error)
    //         if (error) {
    //             return res.status(500).json({error: error.message})
    //         }
    //         return res.status(200).json({user})
    //     } catch (error: any) {
    //         return res.status(500).json({error: error.message})
    //     }
    // } else if (req.method === "PUT") {
    if (req.method === "PUT") {
        const {
            id,
            name,
            active,
            roleNotificationsSuspended,
            type,
            address,
            nearBy,
            city,
            president,
            treasurer,
            secretary
        }:
            {
                id: number,
                name: string,
                active: boolean,
                type: string,
                address: string,
                nearBy: string,
                city: string,
                roleNotificationsSuspended: boolean,
                president: IUser | null,
                treasurer: IUser | null,
                secretary: IUser | null
            } = req.body

        console.log('id', id)
        console.log('name', name)
        console.log('active', active)
        console.log('roleNotificationsSuspended', roleNotificationsSuspended)
        console.log('type', type)
        console.log('address', address)
        console.log('nearBy', nearBy)
        console.log('city', city)
        console.log('president', president)
        console.log('treasurer', treasurer)
        console.log('secretary', secretary)

        try {
            const savedColony = await saveColony(id, name, active, type, address, nearBy, city, roleNotificationsSuspended, president, treasurer, secretary)
            return res.status(200).json({colony: savedColony})
        } catch (error: any) {
            return res.status(400).json({error: error})
        }
    }
}

export default handler
