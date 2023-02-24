import * as React from 'react';
import Users from "./Users";
import {getUsers} from "@/lib/prisma/users";

export const revalidate = 1;
const UsersPage = async () => {

    const {users} = await getUsers()

    return (
        users && (<div>
                <React.Fragment>
                    <Users users={users} data-superjson/>
                </React.Fragment>
            </div>
        )
    );
}
export default UsersPage;
