"use client"

import setUserBlocked from "../pages/api/user/[userId]/setBlocked";
import {useEffect, useState} from "react";
import {User} from "@prisma/client";
import setUserBlockedCall from "../pages/api/user/[userId]/setBlocked";

const BlockButton = ({userId}: { userId: number }) => {

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ blocked: blockedValue })
        };
        const response = fetch('https://localhost:3000/api/user/' + userId, requestOptions).then(async user => {
            const data = await response.json();
        })

    }, [])


    async function setUserBlocked() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ blocked: blockedValue })
        };
        const response = await fetch('https://localhost:3000/api/user/' + userId, requestOptions);
        const data = await response.json();
        // setBlocked(data.user.blocked)
    }


    return (
        <button className="btn btn-outline-dark" onClick={setBlocked}>
        {/*{blocked ? "Unblock" : "Block"}*/}
    </button>
)

}
export default BlockButton