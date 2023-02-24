import * as React from 'react';
import {getColonies} from "@/lib/prisma/colonies";
import Colonies from "./Colonies";
import {ColonyPlus} from "@/types/colony.type";

// Wait for better version !
// Use: revalidateUrl('/administration/colonies/'): doesnt work.
export const revalidate = 1
const ColoniesPage = async () => {

    const {colonies} = await getColonies()

    return (
        colonies && (<div>
                <React.Fragment>
                    <Colonies colonies={colonies} data-superjson/>
                </React.Fragment>
            </div>
        )
    );
}
export default ColoniesPage;
