import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";
import {IUser} from "@/types/user.type";
import * as assert from "assert";

function userJson(user: IUser) {
    return {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
    }
}

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
            president,
            treasurer,
            secretary
        }:
            {
                id: number,
                name: string,
                active: boolean,
                type: string,
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
        console.log('president', president)
        console.log('treasurer', treasurer)
        console.log('secretary', secretary)

        // some business logic
        // ------------------------------------------------------------------------
        const formerColony = await prisma.colony.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                formerPresident: true,
                formerTreasurer: true,
                formerSecretary: true,
                president: true,
                treasurer: true,
                secretary: true
            }
        })

        if (!formerColony) throw new Error("no former colony");

        const orgSaved = formerColony.roleNotificationsSuspended && formerColony.savedDuringRoleNotificationsSuspended;
        const formerPresident = orgSaved ? formerColony.formerPresident : formerColony.president
        const formerTreasurer = orgSaved ? formerColony.formerTreasurer : formerColony.treasurer
        const formerSecretary = orgSaved ? formerColony.formerSecretary : formerColony.secretary

        const savedDuringRoleNotificationsSuspended = roleNotificationsSuspended

        // MailNotificationList mailNotificationList = new MailNotificationList();
        // // notifications
        // if (!roleNotificationsSuspended) {
        //     DetectUserChange detectUserChange = new DetectUserChange();
        //     mailNotificationList.mergeList(detectUserChange.notifyColonyRoleChanges(colony, formerPresident, colony.getPresident(), ColonyRole.PRESIDENT));
        //     mailNotificationList.mergeList(detectUserChange.notifyColonyRoleChanges(colony, formerTreasurer, colony.getTreasurer(), ColonyRole.TREASURER));
        //     mailNotificationList.mergeList(detectUserChange.notifyColonyRoleChanges(colony, formerSecretary, colony.getSecretary(), ColonyRole.SECRETARY));
        // }
        //
        // // setup
        // if (creating) {
        //     setupColony(colony);
        // }

        // send notification emails
        // mailNotificationList.logMails();
        // mailNotificationList.sendMails(mailService);

        // ------------------------------------------------------------------------
        const query: any = {}
        query.where = {
            id: Number(id)
        }
        query.data = {
            name: name,
            active: active,
            roleNotificationsSuspended: roleNotificationsSuspended,
            savedDuringRoleNotificationsSuspended: savedDuringRoleNotificationsSuspended,
            type: type,
        }

        // cant edit junta member if already exists - just connect
        // president cant be empty
        // if (president) query.data.president = president.id ? {connect: {id: president.id}} : {create: userJson(president)}
        // if (treasurer) query.data.treasurer = treasurer.id ? {connect: {id: treasurer?.id}} : {create: userJson(treasurer)}
        if (formerPresident) query.data.formerPresident = {
            connect: { id: formerPresident.id }
        }
        if (formerTreasurer) query.data.formerTreasurer = {
            connect: { id: formerTreasurer.id }
        }
        if (formerSecretary) query.data.formerSecretary = {
            connect: { id: formerSecretary.id }
        }
        if (president) query.data.president = {
            connectOrCreate: {
                where: {email: president.email},
                create: userJson(president)
            }
        }
        if (treasurer) query.data.treasurer = {
            connectOrCreate: {
                where: {email: treasurer.email},
                create: userJson(treasurer)
            }
        }
        if (secretary) query.data.secretary = {
            connectOrCreate: {
                where: {email: secretary.email},
                create: userJson(secretary)
            }
        }

        query.include = {
            president: true,
            treasurer: true,
            secretary: true,
        }
        console.log('query: ', query)

        const colony = await prisma.colony.update(query)

        return res.status(200).json({user: colony})
    }
}

export default handler
