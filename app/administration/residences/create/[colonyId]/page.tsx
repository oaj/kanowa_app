import {getColonyById} from "@/lib/prisma/colonies";
import ColonyManagementDialog from "@/components/colony/ColonyManagementDialog";
import ResidenceManagementDialog from "@/components/residence/ResidenceManagementDialog";
import {getResidencesByColonyId} from "@/lib/prisma/residences";
import {IColony} from "@/types/colony.type";
import {getResidenceTags} from "@/lib/prisma/residenceTags";

const ColonyCreate = async ({params}: { params: { colonyId: string } }) => {

    const colonyId = params.colonyId

    const {colony, error: colError}: {colony?: IColony | null, error?: unknown} = await getColonyById(parseInt(colonyId))
    const {residenceTags, error: resError} = await getResidenceTags(parseInt(colonyId))
    const error = colError || resError

    if (error) return <div>error.message</div>
    if (!colony || !colony.id) return <div>No Colony</div>

    return (
        <ResidenceManagementDialog colony={colony} residence={null} residenceTags={residenceTags} data-superjson/>
    )
};
export default ColonyCreate;