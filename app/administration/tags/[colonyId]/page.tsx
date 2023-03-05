import * as React from 'react';
import {getColonyById} from "@/lib/prisma/colonies";
import {getResidencesByColonyId} from "@/lib/prisma/residences";
import ResidenceTags from "./ResidenceTags";
import {getResidenceTags} from "@/lib/prisma/residence.tags";

// Wait for better version !
// Use: revalidateUrl('/administration/colonies/'): doesnt work.
export const revalidate = 1

const ResidenceTagsPage = async ({params}: { params: { colonyId: string } }) => {

    const id = params.colonyId
    let {colony, error: colError} = await getColonyById(parseInt(id))

    if (colError) return <div>colError.message</div>

    if (!colony)  return <div>No Colony</div>

    const { residenceTags, error } = await getResidenceTags(parseInt(id))

    if (error) return <div>error.message</div>

    return (
        residenceTags && (<div>
                <React.Fragment>
                    <ResidenceTags colonyId={colony.id as number} colonyName={colony.name} residenceTags={residenceTags} data-superjson/>
                </React.Fragment>
            </div>
        )
    );
}
export default ResidenceTagsPage;
