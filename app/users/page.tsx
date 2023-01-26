import React from 'react'
import prisma from '../../lib/prisma';


export default async function Users() {

    const users = await prisma.user.findMany()

    // console.log('users', users)

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
