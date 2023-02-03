import * as React from 'react';
import Link from "next/link";
import Users from "./Users";
import {getUsers} from "@/lib/prisma/users";
import {MdAddBusiness} from "react-icons/md";

export const revalidate = 1

const UsersPage = async () => {

    const {users} = await getUsers()

    return (
        users && (<div>
                <React.Fragment>
                    <div className="header">
                        <div className="title spacer">Users</div>
                        <Link href="/administration/users/create" className="btn btn-outline-secondary">
                            <MdAddBusiness className="addIcon xx-large no-events"/>
                            New User
                        </Link>
                    </div>
                    <Users users={users} data-superjson />
                </React.Fragment>
            </div>
        )
    );
}
export default UsersPage;
