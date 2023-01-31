import React from 'react'
import index from '@/lib/prisma';


export default async function Users() {

    const users = await index.user.findMany()

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
