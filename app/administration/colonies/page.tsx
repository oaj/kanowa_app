import * as React from 'react';
import {getColonies} from "@/lib/prisma/colonies";
import Colonies from "./Colonies";
import Link from "next/link";
import {MdAddBusiness} from "react-icons/md";

export const revalidate = 1

const ColoniesPage = async () => {

    const {colonies} = await getColonies()

    return (
        colonies && (<div>
                <React.Fragment>
                    <div className="header">
                        <div className="title spacer">Colonies</div>
                        <Link href="/administration/colonies/create" className="btn btn-outline-secondary">
                            <MdAddBusiness className="addIcon xx-large no-events"/>
                            New Colony
                        </Link>
                    </div>
                    <Colonies colonies={colonies} data-superjson/>
                </React.Fragment>
            </div>
        )
    );
}
export default ColoniesPage;
