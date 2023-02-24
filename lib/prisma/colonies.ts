import prisma from '.'
import {ColonyPlus} from "@/types/colony.type";


export async function getColonies() {
    console.log('getColonies', getColonies)
    try {
        const colonies = await prisma.colony.findMany({
            include: {
                president: true,
                treasurer: true,
                secretary: true,
            }
        })
        console.log('getColonies - colonies', colonies)
        return { colonies }
    } catch (error) {
        throw error
    }
}

export async function getColonyById(id: number) {
    try {
        const colony = await prisma.colony.findUnique({
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
