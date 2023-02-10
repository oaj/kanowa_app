import prisma from '.'
import {ColonyPlus} from "@/types/colony.type";


export async function getColonies() {
    try {
        const colonies: ColonyPlus[] = await prisma.colony.findMany({
            include: {
                president: true,
                treasurer: true,
                secretary: true,
            }
        })
        return { colonies }
    } catch (error) {
        throw error
    }
}

export async function getColonyById(id: number) {
    try {
        const colony: ColonyPlus | null = await prisma.colony.findUnique({
            where: { id: Number(id) },
            include: {
                president: true,
                treasurer: true,
                secretary: true,
                residencies: true,
            }
        })
        return { colony }
    } catch (error) {
        return { error }
    }
}
