import {ResidenceTag} from "@prisma/client";
import {IResidenceTag} from "@/types/residence.tag.type";

export const residenceTagsConnectDisconnect = (newResidenceTags: IResidenceTag[], oldResidenceTags?: IResidenceTag[]) => {

    const newTagNames = newResidenceTags.map(tag => tag.name)

    if (oldResidenceTags) {
        const oldTagNames = oldResidenceTags.map(tag => tag.name)

        const toBeDisconnected = oldTagNames.filter(name => newTagNames.includes(name))
        const toBeConnected = newTagNames.filter(name => oldTagNames.includes(name))

        let disconnectQuery = null
        disconnectQuery = toBeDisconnected.length > 0 ? 'disconnect: [{id:' + toBeDisconnected.join('},{id:') + '}]' : null
        let connectQuery = null
        connectQuery = toBeConnected.length > 0 ? 'connect: [{id:' + toBeConnected.join('},{id:') + '}]' : null

        if (disconnectQuery != null && connectQuery != null) return {disconnectQuery, connectQuery}
        if (disconnectQuery != null) return {disconnectQuery}
        if (connectQuery != null) return {connectQuery}
        return null
    }
    return
}