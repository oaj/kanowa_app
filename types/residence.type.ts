import {IUser} from "./user.type";
import {IResidenceTag} from "@/types/residence.tag.type";

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
    residenceTags: IResidenceTag[]
}
