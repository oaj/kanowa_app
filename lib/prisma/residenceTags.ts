import prisma from '.'
import {IResidenceTag} from "@/types/residence.tag.type";

export const revalidate = 5;

export const IResidenceTagSelect = {
    id: true,
    name: true,
}
export async function getResidenceTags(colonyId: number) {
    console.log('getResidenceTags', colonyId)

    try {
        let residenceTags: IResidenceTag[] = await prisma.residenceTag.findMany({
            select: IResidenceTagSelect
        })
        return {residenceTags}
    } catch (error) {
        return {error}
    }
}

export async function getResidenceTagsByResidenceId(residenceId: number) {
    console.log('getResidenceTagsByResidenceId', residenceId)

    try {
        const residenceTags: IResidenceTag[] = await prisma.residenceTag.findMany({
            where: {
                id: residenceId
            },
            select: IResidenceTagSelect
        })

        return {residenceTags}
    } catch (error) {
        return {error}
    }
}

