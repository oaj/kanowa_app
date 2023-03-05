import {getColonyById} from "@/lib/prisma/colonies";
import ResidenceManagementDialog from "@/components/residence/ResidenceManagementDialog";
import {IColony} from "@/types/colony.type";
import {getResidenceTagById, getResidenceTags} from "@/lib/prisma/residence.tags";
import {IResidenceTag} from "@/types/residence.tag.type";
import ResidenceTagManagementDialog from "@/components/tag/ResidenceTagManagementDialog";

const ResidenceTagEdit = async ({params}: { params: { colonyId: string, residenceTagId: string} }) => {

    const colonyId = params.colonyId
    const residenceTagId = params.residenceTagId

    console.log('colonyId', colonyId)
    console.log('residenceTagId', residenceTagId)

    const {colony, error: colError}: {colony?: IColony | null, error?: unknown} = await getColonyById(parseInt(colonyId))
    const {residenceTag, error: resError}: {residenceTag?: IResidenceTag | null, error?: unknown} = await getResidenceTagById(parseInt(residenceTagId))


    if (colError) return <div>error.message</div>
    if (!colony || !colony.id) return <div>No Colony</div>
    if (!residenceTag || !residenceTag.id) return <div>No Residence tag</div>

    return (
        <ResidenceTagManagementDialog colony={colony} residenceTag={residenceTag} data-superjson/>
    )
};
export default ResidenceTagEdit;