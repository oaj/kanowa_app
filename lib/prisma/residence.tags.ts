import prisma from '.'
import {IResidenceTag} from "@/types/residence.tag.type";
import {IResidence} from "@/types/residence.type";
import {IResidenceSelect} from "@/lib/prisma/residences";

export const revalidate = 5;

export const IResidenceTagSelect = {
    id: true,
    name: true,
}
export async function getResidenceTags(colonyId: number) {
    console.log('getResidenceTags', colonyId)

    try {
        let residenceTags: IResidenceTag[] = await prisma.residenceTag.findMany({
            where: {
                colonyId: colonyId
            },
            select: IResidenceTagSelect
        })
        return {residenceTags}
    } catch (error) {
        return {error}
    }
}

export async function getResidenceTagById(id: number) {
    try {
        const residenceTag: IResidenceTag | null = await prisma.residenceTag.findUnique({
            where: {id: Number(id)},
            select: IResidenceTagSelect,
        })
        return {residenceTag}
    } catch (error) {
        return {error}
    }
}
