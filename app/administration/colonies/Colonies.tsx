"use client"
import {Colony} from "@prisma/client";
import {ChangeEvent, useEffect, useState} from "react";
import {ColonyPlus, ColonyWebTypes} from "@/types/colony.type";
import * as React from "react";
import {MdAddBusiness, MdCancel, MdEdit, MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import moment from "moment/moment";
import Link from "next/link";
import {IconButton} from "@mui/material";
import TableHeaderRow from "@/components/table/TableHeaderRow";
import TableHeaderCell from "@/components/table/TableHeaderCell";
import TableDataRow from "@/components/table/TableDataRow";

type SortType = "name" | "created" | "active" | "type";

const Colonies = ({colonies}: { colonies: ColonyPlus[] }) => {
    const [filteredSortedColonies, setFilteredSortedColonies] = useState<ColonyPlus[]>([]);

    const [sort, setSort] = useState<SortType>("created");
    const [ascending, setAscending] = useState<boolean>(true);

    const [filterName, setFilterName] = useState<string>("");

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
    const sortByCreated = () => {
        setSorting("created")
    }
    const sortByActive = () => {
        setSorting("active")
    }
    const sortByType = () => {
        setSorting("type")
    }

    const changeName = (event: ChangeEvent) => {
        setFilterName((event.target as HTMLInputElement).value);
        console.log('filterName', filterName)
    }

    useEffect(() => {
        const sorter = (a: Colony, b: Colony) => {
            switch (sort) {
                case "name": {
                    return number(ascending) * a.name.localeCompare(b.name)
                }
                case "created": {
                    return number(ascending) * number((a.createdAt.valueOf() > b.createdAt.valueOf()))
                }
                case "active": {
                    return number(ascending) * (number(b.active) - number(a.active))
                }
                case "type": {
                    if (a.type === null || b.type === null) return 0;
                    return number(ascending) * a.type.localeCompare(b.type)
                }
            }
            return 0;
        }

        let fsColonies: ColonyPlus[] | null;
        fsColonies = colonies?.sort((a, b) => sorter(a, b))
            .filter(colony => filterName ? (colony.name.toLowerCase().includes(filterName.toLowerCase())) : true);
        setFilteredSortedColonies(fsColonies)

    }, [colonies, ascending, sort, filterName])

    const handleClearNameFilter = () => {
        setFilterName("")
    }

    const styles = {
        colonyColumns: "grid grid-cols-[1fr_1fr_0.5fr_1fr_1fr_1fr_1fr_0.2fr] gap-x-2 p-2",
        tableHeaderSortCell: "flex items-center hover:font-bold hover:cursor-pointer",
    }

    return (
        <div>
            <div className="">
                <h2 className="text-center">Colonies</h2>
                <Link href="/administration/colonies/create" className="btn btn-outline-secondary">
                    <IconButton aria-label="delete" size="medium">
                        <MdAddBusiness className="addIcon xx-large no-events"/>
                        New Colony
                    </IconButton>
                </Link>
            </div>
            <div className="bg-gray-800 flex gap-2 items-center px-4 py-2">
                <div className="flex-1">Set filter:</div>
                By Name <input className="rounded-2xl" autoFocus value={filterName} onChange={changeName}/>
                <MdCancel className="cursor-pointer text-xl" onClick={handleClearNameFilter}/>
            </div>
            <div>
                <TableHeaderRow className={styles.colonyColumns}>
                    <TableHeaderCell onClick={sortByName}>
                        Name
                        {sort === "name" && (ascending ? <MdKeyboardArrowUp className="pointer-events-none"/> :
                            <MdKeyboardArrowDown className="pointer-events-none"/>)}
                    </TableHeaderCell>
                    <TableHeaderCell onClick={sortByCreated}>
                        Created
                        {sort === "created" && (ascending ? <MdKeyboardArrowUp className="pointer-events-none"/> :
                            <MdKeyboardArrowDown className="pointer-events-none"/>)}
                    </TableHeaderCell>
                    <TableHeaderCell onClick={sortByActive}>
                        Active
                        {sort === "active" && (ascending ? <MdKeyboardArrowUp className="pointer-events-none"/> :
                            <MdKeyboardArrowDown className="pointer-events-none"/>)}
                    </TableHeaderCell>
                    <TableHeaderCell>President</TableHeaderCell>
                    <TableHeaderCell>Treasurer</TableHeaderCell>
                    <TableHeaderCell>Secretary</TableHeaderCell>
                    <TableHeaderCell onClick={sortByType}>
                        Type
                        {sort === "type" && (ascending ? <MdKeyboardArrowUp className="pointer-events-none"/> :
                            <MdKeyboardArrowDown className="pointer-events-none"/>)}
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right"></TableHeaderCell>
                </TableHeaderRow>
                {
                    filteredSortedColonies
                        .map((colony) => (
                            <TableDataRow href={"administration/colonies/detail/" + colony.id}
                                  className={styles.colonyColumns}
                                  key={colony.id.toString()}>
                                <div>{colony.name}</div>
                                <div>{moment(colony.createdAt).fromNow()}</div>
                                <div>{colony.active ? "Yes" : "No"}</div>
                                <div>{colony.president ? colony.president.firstname + " " + colony.president.lastname : ""}</div>
                                <div>{colony.treasurer ? colony.treasurer.firstname + " " + colony.treasurer.lastname : ""}</div>
                                <div>{colony.secretary ? colony.secretary.firstname + " " + colony.secretary.lastname : ""}</div>
                                <div>{ColonyWebTypes.valueOf(colony.type)?.label}</div>
                                <Link href={"/administration/colonies/edit/" + colony.id} passHref
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
export default Colonies;
