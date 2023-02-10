import {getUserById} from "@/lib/prisma/users";
import {NextApiRequest, NextApiResponse} from "next";
import {Role, User} from "@prisma/client";
import prisma from "@/lib/prisma";
import {IUser} from "@/types/user.type";
import {ColonyWebTypes} from "@/types/colony.type";

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
            type,
            president,
            treasurer,
            secretary
        }:
            {
                id: number,
                name: string,
                active: boolean,
                type: string,
                president: IUser | null,
                treasurer: IUser | null,
                secretary: IUser | null
            } = req.body

        console.log('id', id)
        console.log('name', name)
        console.log('active', active)
        console.log('type', type)
        console.log('president', president)
        console.log('treasurer', treasurer)
        console.log('secretary', secretary)

        const query: any = {}
        query.where = {
            id: Number(id)
        }
        query.data = {
            name: name,
            active: active,
            type: type,
        }

        // todo: cant edit president.. if already exists
        if (president) query.data.president = president.id ? {
            connect: {
                id: president.id,
            },
            // data: {
            //     name: name,
            //     active: active,
            //     type: type,
            // },
        } : {create: president}
        if (treasurer) query.data.treasurer = treasurer.id ? {connect: {id: treasurer?.id}} : {create: treasurer}
        if (secretary) query.data.secretary = secretary.id ? {connect: {id: secretary?.id}} : {create: secretary}
        query.include = {
            president: true,
            treasurer: true,
            secretary: true,
        }
        console.log('query: ', query)
        const colony = await prisma.colony.update(query)
        return res.status(200).json({user: colony})
    } else if (req.method === "POST") {
        const {id, firstname, lastname, email, role}:
            { id: number, firstname: string, lastname: string, email: string, role: Role } = req.body

        console.log('POST')
        console.log('id', id)
        console.log('firstname', firstname)
        console.log('lastname', lastname)
        console.log('email', email)
        console.log('role', role)

        // const user = await prisma.user.create({
        //     data: {
        //         firstname: firstname,
        //         lastname: lastname,
        //         email: email,
        //         role: role,
        //     },
        // })
        return res.status(200)
        // return res.status(200).json({user: user})
    }
}

export default handler
