import {NextApiRequest, NextApiResponse} from "next";
import {IUser} from "@/types/user.type";
import {saveResidence} from "@/lib/services/residenceService";
import {IResidenceTag} from "@/types/residence.tag.type";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('req', req)
    console.log('req.method', req.method)

    if (req.method === "POST") {
        console.log('Save residence end point.')
        const {colonyId, doorNumber, residenceTags, owner, tenant, responsible}:
            {
                colonyId: number, doorNumber: string, residenceTags: IResidenceTag[],
                owner: IUser,
                tenant: IUser | null,
                responsible: IUser | null
            } = req.body

        console.log('POST')
        console.log('doorNumber', doorNumber)
        console.log('colonyId', colonyId)
        console.log('residenceTags', residenceTags)
        console.log('owner', owner)
        console.log('tenant', tenant)
        console.log('responsible', responsible)

        const savedResidence = saveResidence(null, colonyId, doorNumber, residenceTags, owner, tenant, responsible)
        return res.status(200).json({residence: savedResidence})
    }
}
export default handler
