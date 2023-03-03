import {NextApiRequest, NextApiResponse} from "next";
import {IUser} from "@/types/user.type";
import {saveResidence} from "@/lib/services/residenceService";
import {IResidenceTag} from "@/types/residence.tag.type";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('req', req)
    console.log('req.method', req.method)

    if (["POST", "PUT"].includes(req.method as string)) {
        console.log('Save residence end point.')
        const {id, colonyId, doorNumber, residenceTags, owner, tenant, responsible}:
            {
                id: number | null
                colonyId: number,
                doorNumber: string,
                residenceTags: IResidenceTag[],
                owner: IUser,
                tenant: IUser | null,
                responsible: IUser | null
            } = req.body

        console.log('req.method', req.method)
        console.log('id', id)
        console.log('colonyId', colonyId)
        console.log('doorNumber', doorNumber)
        console.log('residenceTags', residenceTags)
        console.log('owner', owner)
        console.log('tenant', tenant)
        console.log('responsible', responsible)
        console.log('saveResidence-----------------------------------')
        try {
            const savedResidence = await saveResidence(id, colonyId, doorNumber, residenceTags, owner, tenant, responsible)
            return res.status(200).json({residence: savedResidence})
        } catch (error: any) {
            return res.status(400).json({error: error})
        }
    }
}
export default handler
