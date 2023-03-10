"use client"
import * as React from 'react';
import {ChangeEvent, useEffect, useState} from "react";
import moment from 'moment';
import {MdCancel, MdEdit} from "react-icons/md";
import Link from "next/link";
import {IconButton} from "@mui/material";
import TableDataRow from "@/components/table/TableDataRow";
import TableHeaderRow from "@/components/table/TableHeaderRow";
import TableHeaderCell from "@/components/table/TableHeaderCell";
import {IUser} from "@/types/user.type";

export type SortType = "name" | "username" | "created" | "active" | "email";

const sortFields = {
    "name": (user: IUser) => user.firstname+user.lastname,
    "username": (user: IUser) => user.username,
    "created": (user: IUser) => user.createdAt,
    "active": (user: IUser) => user.active,
    "email": (user: IUser) => user.email,
}

const Users = ({users}: { users: IUser[] }) => {

    const [filteredSortedUsers, setFilteredSortedUsers] = useState<IUser[]>([]);

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

    const sorter = (a: IUser, b: IUser) => {
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

        let fsUsers: IUser[] | [];
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
        userColumns: "grid grid-cols-[1fr_0.6fr_1fr_0.5fr_1fr_0.2fr] gap-x-2 p-2",
    }

    return (
        <div>
            <div className="">
                <h2 className="text-center">Users</h2>
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
                    <TableHeaderCell className="text-right"/>
                </TableHeaderRow>
                {
                    filteredSortedUsers
                        .map((user) => (
                            <TableDataRow href={"administration/users/detail/" + user.id}
                            className={styles.userColumns}
                            key={user.id?.toString()}>
                                <div>{user.firstname + " " + user.lastname}</div>
                                <div>{user.username}</div>
                                <div>{moment(user.createdAt).fromNow()}</div>
                                <div>{user.active ? "Yes" : "No"}</div>
                                <div>{user.email}</div>
                                <Link href={"/administration/users/edit/" + user.id} passHref
                                      className="text-right">
                                    <IconButton size="small" title="Edit">
                                        <MdEdit fontSize="inherit" className="fill-current group-hover:fill-gray-800"/>
                                    </IconButton>
                                </Link>
                            </TableDataRow>
                        ))
                }
            </div>
        </div>
    );
}
export default Users;
