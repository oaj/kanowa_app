import {getColonyById} from "@/lib/prisma/colonies";
import {IColony} from "@/types/colony.type";
import ResidenceTagManagementDialog from "@/components/tag/ResidenceTagManagementDialog";

const ColonyCreate = async ({params}: { params: { colonyId: string } }) => {

    const colonyId = params.colonyId

    const {colony, error: colError}: {colony?: IColony | null, error?: unknown} = await getColonyById(parseInt(colonyId))

    if (!colony || !colony.id) return <div>No Colony</div>

    return (
        <ResidenceTagManagementDialog colony={colony} residenceTag={null} data-superjson/>
    )
};
export default ColonyCreate;