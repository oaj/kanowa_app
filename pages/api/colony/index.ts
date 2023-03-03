import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";
import {registerColony} from "@/lib/services/colonyService";
import {saveResidence} from "@/lib/services/residenceService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {

        const {name, address, nearBy, city, firstname, lastname, email}:
            { name: string, address: string, nearBy: string, city: string, firstname: string, lastname: string, email: string } = req.body

        console.log('POST')
        console.log('name', name)
        console.log('address', address)
        console.log('nearBy', nearBy)
        console.log('city', city)
        console.log('firstname', firstname)
        console.log('lastname', lastname)
        console.log('email', email)

        try {
            const savedColony = await registerColony(name, address, nearBy, city, firstname, lastname, email)
            return res.status(200).json({colony: savedColony})
        } catch (error: any) {
            return res.status(400).json({error: error})
        }
    }
}

export default handler
