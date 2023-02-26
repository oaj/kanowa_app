import {IUser} from "./user.type";
import {Colony, Residence, ResidenceTag, User} from "@prisma/client";

export type ResidencePlus = (IResidence & { owner: User, tenant: User | null, responsible: User | null, colony?: Colony, residenceTags: string[] })

// This should be what prisma delivers
export interface IResidence {
    id: number,
    doorNumber: string,
    owner: IUser,
    tenant: IUser,
    responsible: IUser,
    colony: {
        id: number,
        name: string
    },
    residenceTags: { name: string }[]
}
