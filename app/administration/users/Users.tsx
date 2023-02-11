"use client"
import * as React from 'react';
import {ChangeEvent, useEffect, useState} from "react";
import moment from 'moment';
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdCancel, MdAddBusiness} from "react-icons/md";
import Link from "next/link";
import {User} from "@prisma/client";
import {IconButton} from "@mui/material";
import TableDataRow from "@/components/table/TableDataRow";
import TableHeaderRow from "@/components/table/TableHeaderRow";
import TableHeaderCell from "@/components/table/TableHeaderCell";

export type SortType = "name" | "username" | "created" | "active" | "email";

const sortFields = {
    "name": (user: User) => user.firstname+user.lastname,
    "username": (user: User) => user.username,
    "created": (user: User) => user.createdAt,
    "active": (user: User) => user.active,
    "email": (user: User) => user.email,
}

const Users = ({users}: { users: User[] }) => {

    const [filteredSortedUsers, setFilteredSortedUsers] = useState<User[]>([]);

    const [sort, setSort] = useState<SortType>("created");
    const [ascending, setAscending] = useState<boolean>(true);

    const [filterText, setFilterText] = useState<string>("");

    const setSorting = (newSort: SortType) => {
        console.log(newSort)
        setAscending( newSort === sort ? !ascending : true);
        setSort(newSort);
    }

    const number = (a: boolean) => {
        return a ? 1 : -1;
    }

    const sorter = (a: User, b: User) => {
        const valA = sortFields[sort](a)
        const valB = sortFields[sort](b)
        if (typeof valA === 'string' && typeof valB === 'string') {
            return number(ascending) * valA.localeCompare(valB)
        } else if (typeof valA === 'boolean' && typeof valB === 'boolean') {
            return number(ascending) * (number(valB) - number(valA))
        } else if (valA instanceof Date && valB instanceof Date) {
            return number(ascending) * number((valA.valueOf() > valB.valueOf()))
        } else if (typeof valA === 'number' && typeof valB === 'number') {
            return number(ascending) * (valA - valB)
        }
        return 0;
    }

    const changeFilterText = (event: ChangeEvent) => {
        setFilterText((event.target as HTMLInputElement).value);
        console.log('filterText', filterText)
    }

    useEffect(() => {

        let fsUsers: User[] | [];
        fsUsers = users?.sort((a, b) => sorter(a, b))
            .filter(user => {
                const textToBeFiltered = user.firstname + " " + user.lastname + " " + user.email + +" " + user.username;
                return filterText ? (textToBeFiltered.toLowerCase().includes(filterText.toLowerCase())) : true
            });
        setFilteredSortedUsers(fsUsers)

    }, [users, ascending, sort, filterText])

    const handleClearTextFilter = () => {
        setFilterText("")
    }

    const styles = {
        userColumns: "grid grid-cols-[1fr_0.6fr_1fr_0.5fr_1fr] gap-x-2 p-2",
    }

    return (
        <div>
            <div className="">
                <h2 className="text-center">Users</h2>
                <Link href="/administration/users/create" className="">
                    <IconButton aria-label="delete" size="medium">
                        <MdAddBusiness className="mr-2 text-2xl pointer-events-none"/>
                        New User
                    </IconButton>
                </Link>
            </div>
            <div className="bg-gray-800 flex gap-2 items-center px-4 py-2">
                <div className="flex-1">Set filter:</div>
                By Name <input className="rounded-2xl" autoFocus value={filterText} onChange={changeFilterText}/>
                <MdCancel className="cursor-pointer text-xl" onClick={handleClearTextFilter}/>
            </div>
            <div>
                <TableHeaderRow className={styles.userColumns}>
                    <TableHeaderCell title="Name" sortKey="name" sort={sort} ascending={ascending} onClick={() => setSorting("name")} />
                    <TableHeaderCell title="Username" sortKey="username" sort={sort} ascending={ascending} onClick={() => setSorting("username")} />
                    <TableHeaderCell title="Created" sortKey="created" sort={sort} ascending={ascending} onClick={() => setSorting("created")} />
                    <TableHeaderCell title="Active" sortKey="active" sort={sort} ascending={ascending} onClick={() => setSorting("active")} />
                    <TableHeaderCell title="Email" sortKey="email" sort={sort} ascending={ascending} onClick={() => setSorting("email")} />
                </TableHeaderRow>
                {
                    filteredSortedUsers
                        .map((user) => (
                            <TableDataRow href={"administration/users/detail/" + user.id}
                            className={styles.userColumns}
                            key={user.id.toString()}>
                                <div>{user.firstname + " " + user.lastname}</div>
                                <div>{user.username}</div>
                                <div>{moment(user.createdAt).fromNow()}</div>
                                <div>{user.active ? "Yes" : "No"}</div>
                                <div>{user.email}</div>
                            </TableDataRow>
                        ))
                }
            </div>
        </div>
    );
}
export default Users;
