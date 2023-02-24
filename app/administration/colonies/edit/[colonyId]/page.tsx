import {getColonyById} from "@/lib/prisma/colonies";
import ColonyManagementDialog from "@/components/colony/ColonyManagementDialog";

const ColonyEdit = async ({params}: { params: { colonyId: string } }) => {

    const id = params.colonyId

    const {colony, error} = await getColonyById(parseInt(id))

    if (error) return <div>error.message</div>

    return (
        colony && (
            <ColonyManagementDialog colony={colony} data-superjson/>
        ));
};
export default ColonyEdit;
