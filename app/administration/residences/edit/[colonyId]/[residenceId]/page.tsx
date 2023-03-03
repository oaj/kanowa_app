import {getColonyById} from "@/lib/prisma/colonies";
import ColonyManagementDialog from "@/components/colony/ColonyManagementDialog";
import ResidenceManagementDialog from "@/components/residence/ResidenceManagementDialog";
import {getResidenceById, getResidencesByColonyId} from "@/lib/prisma/residences";
import {IColony} from "@/types/colony.type";
import {getResidenceTags} from "@/lib/prisma/residenceTags";
import {IResidence} from "@/types/residence.type";

const ResidenceCreate = async ({params}: { params: { colonyId: string, residenceId: string} }) => {

    const colonyId = params.colonyId
    const residenceId = params.residenceId

    console.log('colonyId', colonyId)
    console.log('residenceId', residenceId)

    const {colony, error: colError}: {colony?: IColony | null, error?: unknown} = await getColonyById(parseInt(colonyId))
    const {residence, error: resError}: {residence?: IResidence | null, error?: unknown} = await getResidenceById(parseInt(residenceId))

    const {residenceTags, error: tagError} = await getResidenceTags(parseInt(colonyId))
    const error = colError || resError || tagError

    if (error) return <div>error.message</div>
    if (!colony || !colony.id) return <div>No Colony</div>
    if (!residence || !residence.id) return <div>No Residence</div>

    return (
        <ResidenceManagementDialog colony={colony} residence={residence} residenceTags={residenceTags} data-superjson/>
    )
};
export default ResidenceCreate;