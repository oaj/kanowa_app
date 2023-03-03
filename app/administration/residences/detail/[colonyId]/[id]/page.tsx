import {getColonyById} from "@/lib/prisma/colonies";
import {getResidenceById} from "@/lib/prisma/residences";
import {IColony} from "@/types/colony.type";
import {IResidence} from "@/types/residence.type";
import ResidenceManagementDetail from "@/components/residence/ResidenceManagementDetail";

const ColonyCreate = async ({params}: { params: {colonyId: string, id: string } }) => {

    const colonyId = params.colonyId
    const id = params.id

    const {colony, error: colError}: {colony?: IColony | null, error?: unknown} = await getColonyById(parseInt(colonyId))
    const {residence, error: resError}: {residence?: IResidence | null, error?: unknown} = await getResidenceById(parseInt(id))

    const error = colError || resError

    if (error) return <div>error.message</div>
    if (!colony || !colony.id) return <div>No Colony</div>
    if (!residence || !residence.id) return <div>No Residence</div>

    return (
        <ResidenceManagementDetail colony={colony} residence={residence} data-superjson/>
    )
};
export default ColonyCreate;