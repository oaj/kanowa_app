import * as React from 'react';
import Link from "next/link";
import Users from "./Users";
import {getUsers} from "@/lib/prisma/users";
import {MdAddBusiness} from "react-icons/md";


const UsersPage = async () => {

    const {users, error} = await getUsers()

    return (
        users && (<div>
                <React.Fragment>
                    <div className="header">
                        <div className="title spacer">Users</div>
                        <Link href="create" className="btn btn-outline-secondary">
                            <MdAddBusiness className="addIcon xx-large no-events"/>
                            New User
                        </Link>
                    </div>
                    <Users users={users}/>
                </React.Fragment>
            </div>
        )
    );
}
export default UsersPage;
