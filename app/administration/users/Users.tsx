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

type SortType = "name" | "username" | "created" | "active" | "email";

const Users = ({users}: { users: User[] }) => {

    const [filteredSortedUsers, setFilteredSortedUsers] = useState<User[]>([]);

    const [sort, setSort] = useState<SortType>("created");
    const [ascending, setAscending] = useState<boolean>(true);

    const [filterText, setFilterText] = useState<string>("");

    const setSorting = (sort: SortType) => {
        console.log(sort)
        setSort(sort);
        setAscending(!ascending);
    }

    const number = (a: boolean) => {
        return a ? 1 : -1;
    }

    const sortByName = () => {
        setSorting("name")
    }
    const sortByUsername = () => {
        setSorting("username")
    }
    const sortByEmail = () => {
        setSorting("email")
    }
    const sortByCreated = () => {
        setSorting("created")
    }
    const sortByActivated = () => {
        setSorting("active")
    }

    const changeText = (event: ChangeEvent) => {
        setFilterText((event.target as HTMLInputElement).value);
        console.log('filterText', filterText)
    }

    useEffect(() => {
        const sorter = (a: User, b: User) => {
            switch (sort) {
                case "name": {
                    const nameA = a.firstname + a.lastname;
                    const nameB = b.firstname + b.lastname;
                    return number(ascending) * nameA.localeCompare(nameB)
                }
                case "username": {
                    if (!a.username || !b.username) return 0
                    return number(ascending) * a.username.localeCompare(b.username)
                }
                case "email": {
                    if (!a.email || !b.email) return 0
                    return number(ascending) * a.email.localeCompare(b.email)
                }
                case "created": {
                    return number(ascending) * number((a.createdAt.valueOf() > b.createdAt.valueOf()))
                }
                case "active": {
                    return number(ascending) * (number(b.active) - number(a.active))
                }
            }
            return 0;
        }

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
                By Name <input className="rounded-2xl" autoFocus value={filterText} onChange={changeText}/>
                <MdCancel className="cursor-pointer text-xl" onClick={handleClearTextFilter}/>
            </div>
            <div>
                <TableHeaderRow className={styles.userColumns}>
                    <TableHeaderCell onClick={sortByName}>
                        Name
                        {sort === "name" && (ascending ? <MdKeyboardArrowUp className="pointer-events-none"/> :
                            <MdKeyboardArrowDown className="pointer-events-none"/>)}
                    </TableHeaderCell>
                    <TableHeaderCell onClick={sortByUsername}>
                        Username
                        {sort === "username" && (ascending ? <MdKeyboardArrowUp className="pointer-events-none"/> :
                            <MdKeyboardArrowDown className="pointer-events-none"/>)}
                    </TableHeaderCell>
                    <TableHeaderCell onClick={sortByCreated}>
                        Created
                        {sort === "created" && (ascending ? <MdKeyboardArrowUp className="pointer-events-none"/> :
                            <MdKeyboardArrowDown className="pointer-events-none"/>)}
                    </TableHeaderCell>
                    <TableHeaderCell onClick={sortByActivated}>
                        Active
                        {sort === "active" && (ascending ? <MdKeyboardArrowUp className="pointer-events-none"/> :
                            <MdKeyboardArrowDown className="pointer-events-none"/>)}
                    </TableHeaderCell>
                    <TableHeaderCell onClick={sortByEmail}>
                        Email
                        {sort === "email" && (ascending ? <MdKeyboardArrowUp className="pointer-events-none"/> :
                            <MdKeyboardArrowDown className="pointer-events-none"/>)}
                    </TableHeaderCell>
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
