import * as React from 'react';
import {getColonyById} from "@/lib/prisma/colonies";
import {getResidencesByColonyId} from "@/lib/prisma/residences";
import Residences from "./Residences";

// Wait for better version !
// Use: revalidateUrl('/administration/colonies/'): doesnt work.
export const revalidate = 1

const ResidencesPage = async ({params}: { params: { colonyId: string } }) => {

    const id = params.colonyId
    let {colony, error: colError} = await getColonyById(parseInt(id))

    if (colError) return <div>colError.message</div>

    if (!colony) return <div>No Colony</div>

    return (
        <div>
            <React.Fragment>
                <Residences colonyId={colony.id as number} colonyName={colony.name}
                            residences={colony.residences} residenceTags={colony.residenceTags} data-superjson/>
            </React.Fragment>
        </div>
    );
}
export default ResidencesPage;
