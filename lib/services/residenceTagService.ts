import {ResidenceTag} from "@prisma/client";
import {IResidenceTag} from "@/types/residence.tag.type";
import {IUser} from "@/types/user.type";
import prisma from "@/lib/prisma";
import {userConnect, userConnectOrCreate} from "@/lib/services/userService";
import {IResidenceSelect} from "@/lib/prisma/residences";

export const residenceTagsConnectDisconnect = (newResidenceTags: IResidenceTag[], oldResidenceTags?: IResidenceTag[]) => {
    const idFromNew = (name: string) => newResidenceTags?.find(tag => tag.name === name)?.id
    const idFromOld = (name: string) => oldResidenceTags?.find(tag => tag.name === name)?.id

    const newTagNames = newResidenceTags.map(tag => tag.name)
    oldResidenceTags = oldResidenceTags || []

    const oldTagNames = oldResidenceTags.map(tag => tag.name)

    // old tags gone
    const toBeDisconnected = oldTagNames.filter(name => !newTagNames.includes(name))
    // new arrivals
    const toBeConnected = newTagNames.filter(name => !oldTagNames.includes(name))
    let disconnectQuery: any = null
    if (toBeDisconnected.length > 0) {
        disconnectQuery = {disconnect: []}
        toBeDisconnected.forEach(name => disconnectQuery.disconnect.push({id: Number(idFromOld(name))}))
    }
    let connectQuery: any = null
    if (toBeConnected.length > 0) {
        connectQuery = {connect: []}
        toBeConnected.forEach(name => connectQuery.connect.push({id: Number(idFromNew(name))}))
    }

    let res: any = null
    if (disconnectQuery != null || connectQuery != null) {
        res = {}
        if (disconnectQuery != null) res.disconnect = disconnectQuery.disconnect
        if (connectQuery != null) res.connect = connectQuery.connect
    }
    console.log('residenceTagsConnectDisconnect', res)
    return res
}

export async function saveResidenceTag(id: number | null, colonyId: number, name: string) {

    const creating = id == null;

    // Confirm that there is a colony
    const colony = await prisma.colony.findFirst({
        where: {id: colonyId},
    })
    if (!colony) {
        throw {field: 'colony', message: 'No colony found.'}
    }
    // validate that doorNumber is not taken
    const nameCheckResidenceTag = await prisma.residenceTag.findFirst({
        where: {
            colonyId: colonyId,
            id: {not: Number(id)},
            name: name,
        },
    })
    if (nameCheckResidenceTag) {
        throw {field: 'name', message: (name + ' is already taken.')}
    }
    // Now query for save residence tag
    const query: any = {}
    query.data = {
        name: name,
        colony: {connect: {id: Number(colonyId)}},
    }
    console.log('save residence tag query', query)

    let savedResidenceTag = null
    try {
        if (creating) {
            savedResidenceTag = await prisma.residenceTag.create(query)
        } else {
            query.where = {id: Number(id)}
            savedResidenceTag = await prisma.residenceTag.update(query)
        }
    } catch (error: any) {
        throw {message: error.message}
    }

    return savedResidenceTag
}
