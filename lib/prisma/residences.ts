import prisma from '.'
import {IResidence} from "@/types/residence.type";
import {IUserSelect} from "@/lib/prisma/users";

export const IResidenceSelect = {
    id: true,
    doorNumber: true,
    owner: {
        select: IUserSelect,
    },
    tenant: {
        select: IUserSelect,
    },
    responsible: {
        select: IUserSelect,
    },
    colony: {
        select: {
            id: true,
            name: true
        }
    },
    residenceTags: {
        select: {
            name: true,
        },
    },
}

export async function getResidencesByColonyId(colonyId: number) {
    console.log('getResidencesByColonyId', colonyId)

    try {
        const residences: IResidence[] = await prisma.residence.findMany({
            where: {
                colonyId: colonyId
            },
            select: IResidenceSelect
        })

        return {residences}
    } catch (error) {
        return {error}
    }
}

export async function getResidenceById(id: number) {
    try {
        const residence = await prisma.residence.findUnique({
            where: {id: Number(id)},
            include: {
                owner: true,
                tenant: true,
                responsible: true,
                residenceTags: true,
            }
        })
        return {residence}
    } catch (error) {
        return {error}
    }
}
