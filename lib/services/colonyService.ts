import prisma from "@/lib/prisma";
import {userConnectOrCreate} from "@/lib/services/userService";
import {IColonySelect} from "@/lib/prisma/colonies";
import {IUser} from "@/types/user.type";
import {userJson} from "@/lib/services/utils";

export async function registerColony(name: string, address: string, nearBy: string, city: string, firstname: string, lastname: string, email: string) {

    // validate that name of colony is not taken
    const colony = await prisma.colony.findFirst({
        where: {name: name},
    })
    if (colony) {
        throw {field: 'name', message: 'Name is already taken!'}
    }

    const query: any = {}
    query.data = {
        name,
        address,
        nearBy,
        city,
    }
    query.data.president = {
        connectOrCreate: {
            where: {email: email},
            create: {
                email: email,
                firstname: firstname,
                lastname: lastname,
            }
        }
    }
    query.select = IColonySelect;

    let savedColony = null
    try {
        savedColony = await prisma.colony.create(query)
    } catch (error: any) {
        throw {message: error.message}
    }

    return savedColony
}

export async function saveColony(
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
) {
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
    // will never happen
    if (!formerColony) throw new Error("no former colony");

    // validate that name of colony is not taken
    const nameCheckColony = await prisma.colony.findFirst({
        where: {name: name},
    })
    if (nameCheckColony && (id !== nameCheckColony.id)) {
        throw {field: 'name', message: 'Name is already taken!'}
    }

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
        address: address,
        nearBy: nearBy,
        city: city,
    }

    // cant edit junta member if already exists - just connect
    // president cant be empty
    // if (president) query.data.president = president.id ? {connect: {id: president.id}} : {create: userJson(president)}
    // if (treasurer) query.data.treasurer = treasurer.id ? {connect: {id: treasurer?.id}} : {create: userJson(treasurer)}
    if (formerPresident) query.data.formerPresident = {
        connect: {id: formerPresident.id}
    }
    if (formerTreasurer) query.data.formerTreasurer = {
        connect: {id: formerTreasurer.id}
    }
    if (formerSecretary) query.data.formerSecretary = {
        connect: {id: formerSecretary.id}
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

    let savedColony = null
    try {
        savedColony = await prisma.colony.update(query)
    } catch (error: any) {
        throw {message: error.message}
    }

    return savedColony
}
