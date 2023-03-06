import prisma from '.'
import {IColony} from "@/types/colony.type";
import {IUserSelect} from "@/lib/prisma/users";
import {IResidenceSelect} from "@/lib/prisma/residences";
import {IResidenceTagSelect} from "@/lib/prisma/residence.tags";

export const revalidate = 5;

export const IColonySelect = {
    id: true,
    name: true,
    address: true,
    nearBy: true,
    city: true,
    createdAt: true,
    active: true,
    type: true,
    roleNotificationsSuspended: true,
    updatedAt: true,
    president: {
        select: IUserSelect
    },
    treasurer: {
        select: IUserSelect
    },
    secretary: {
        select: IUserSelect
    },
    residences: {
        select: IResidenceSelect
    },
    residenceTags: {
        select: IResidenceTagSelect
    },
}

export async function getColonies() {
    console.log('getColonies', getColonies)
    try {
        const colonies = await prisma.colony.findMany({
            select: IColonySelect
        })
        console.log('getColonies - colonies', colonies)
        return {colonies}
    } catch (error) {
        return {error}
    }
}

export async function getColonyById(id: number) {
    try {
        const colony: IColony | null = await prisma.colony.findUnique({
            where: {id: Number(id)},
            select: IColonySelect
        })
        return {colony}
    } catch (error) {
        return {error}
    }
}
