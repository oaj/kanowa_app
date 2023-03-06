import {IResidenceTag} from "@/types/residence.tag.type";
import prisma from "@/lib/prisma";

export const residenceTagsConnectDisconnect = (newResidenceTags: IResidenceTag[], oldResidenceTags?: IResidenceTag[]) => {
    oldResidenceTags = oldResidenceTags || []
    // old tags gone
    const toBeDisconnectedTags = oldResidenceTags.filter(oldTag => !newResidenceTags.find(newTag => newTag.id === oldTag.id))
    // new arrivals
    const toBeConnectedTags = newResidenceTags.filter(newTag => !oldResidenceTags?.find(oldTag => oldTag.id === newTag.id))

    let disconnectQuery: any = null
    if (toBeDisconnectedTags.length > 0) {
        disconnectQuery = {disconnect: []}
        toBeDisconnectedTags.forEach(tag => disconnectQuery.disconnect.push({id: tag.id}))
    }
    let connectQuery: any = null
    if (toBeConnectedTags.length > 0) {
        connectQuery = {connect: []}
        toBeConnectedTags.forEach(tag => connectQuery.connect.push({id: tag.id}))
    }

    let res: any = null
    if (disconnectQuery != null || connectQuery != null) {
        res = {}
        if (disconnectQuery != null) res.disconnect = disconnectQuery.disconnect
        if (connectQuery != null) res.connect = connectQuery.connect
    }
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
