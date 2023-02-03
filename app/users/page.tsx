import React from 'react'
import {getUsers} from "@/lib/prisma/users";

export default async function Users() {

    const {users} = await getUsers()

    return (
        <div>
            <div className={'text-red-500'}>Users</div>
            <ul>
                {users.map(user =>
                    <li key={user.id}>{user.firstname} {user.lastname}</li>
                )}
            </ul>
        </div>
    )
}
