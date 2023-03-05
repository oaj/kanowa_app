import {NextApiRequest, NextApiResponse} from "next";
import {saveResidenceTag} from "@/lib/services/residenceTagService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('req', req)
    console.log('req.method', req.method)

    if (["POST", "PUT"].includes(req.method as string)) {
        console.log('Save residence tag end point.')
        const {id, colonyId, name}:
            {
                id: number | null
                colonyId: number,
                name: string,
            } = req.body

        console.log('req.method', req.method)
        console.log('id', id)
        console.log('colonyId', colonyId)
        console.log('name', name)
        console.log('saveResidenceTag-----------------------------------')
        try {
            const savedResidenceTag = await saveResidenceTag(id, colonyId, name)
            return res.status(200).json({residence: savedResidenceTag})
        } catch (error: any) {
            return res.status(400).json({error: error})
        }
    }
}
export default handler
