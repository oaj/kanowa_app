"use client"
import {ChangeEvent, useEffect, useState} from "react";
import {ColonyWebTypes, IColony} from "@/types/colony.type";
import * as React from "react";
import {MdCancel, MdEdit, MdOutlineHolidayVillage, MdListAlt} from "react-icons/md";
import moment from "moment/moment";
import Link from "next/link";
import {IconButton} from "@mui/material";
import TableHeaderRow from "@/components/table/TableHeaderRow";
import TableHeaderCell from "@/components/table/TableHeaderCell";
import TableDataRow from "@/components/table/TableDataRow";
import {ColonyType} from "@prisma/client";
import {FaTags} from "react-icons/all";

type SortType = "name" | "created" | "active" | "type";
const sortFields = {
    "name": (colony: IColony) => colony.name,
    "created": (colony: IColony) => colony.createdAt,
    "active": (colony: IColony) => colony.active,
    "type": (colony: IColony) => colony.type,
}

const Colonies = ({colonies}: { colonies: IColony[] }) => {
    const [filteredSortedColonies, setFilteredSortedColonies] = useState<IColony[]>([]);

    const [sort, setSort] = useState<SortType>("created");
    const [ascending, setAscending] = useState<boolean>(true);

    const [filterText, setFilterText] = useState<string>("");

    const setSorting = (newSort: SortType) => {
        console.log(newSort)
        setAscending(newSort === sort ? !ascending : true);
        setSort(newSort);
    }

    const number = (a: boolean) => {
        return a ? 1 : -1;
    }


    const changeFilterText = (event: ChangeEvent) => {
        setFilterText((event.target as HTMLInputElement).value);
        console.log('filterText', filterText)
    }

    useEffect(() => {
        const sorter = (a: IColony, b: IColony) => {
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

        let fsColonies: IColony[] | null;
        fsColonies = colonies?.sort((a, b) => sorter(a, b))
            .filter(colony => filterText ? (colony.name.toLowerCase().includes(filterText.toLowerCase())) : true);
        setFilteredSortedColonies(fsColonies)

    }, [colonies, ascending, sort, filterText])

    const handleClearNameFilter = () => {
        setFilterText("")
    }

    const styles = {
        colonyColumns: "grid grid-cols-[1fr_1fr_0.5fr_1fr_1fr_1fr_1fr_0.3fr_0.3fr_0.3fr_0.3fr] gap-x-2 p-2",
    }

    return (
        <div>
            <div className="">
                <h2 className="text-center">Colonies</h2>
            </div>
            <div className="bg-gray-800 flex gap-2 items-center px-4 py-2">
                <div className="flex-1">Set filter:</div>
                By Name <input className="rounded-2xl" autoFocus value={filterText} onChange={changeFilterText}/>
                <MdCancel className="cursor-pointer text-xl" onClick={handleClearNameFilter}/>
            </div>
            <div>
                <TableHeaderRow className={styles.colonyColumns}>
                    <TableHeaderCell title="Name" sortKey="name" sort={sort} ascending={ascending}
                                     onClick={() => setSorting("name")}/>
                    <TableHeaderCell title="Created" sortKey="created" sort={sort} ascending={ascending}
                                     onClick={() => setSorting("created")}/>
                    <TableHeaderCell title="Active" sortKey="active" sort={sort} ascending={ascending}
                                     onClick={() => setSorting("active")}/>
                    <TableHeaderCell title="President"/>
                    <TableHeaderCell title="Treasurer"/>
                    <TableHeaderCell title="Secretary"/>
                    <TableHeaderCell title="Type" sortKey="type" sort={sort} ascending={ascending}
                                     onClick={() => setSorting("type")}/>
                    <TableHeaderCell className="text-right"/>
                </TableHeaderRow>
                {
                    filteredSortedColonies
                        .map((colony) => (
                            <TableDataRow href={"administration/colonies/detail/" + colony.id}
                                          className={styles.colonyColumns}
                                          key={colony.id?.toString()}>
                                <div>{colony.name}</div>
                                <div>{moment(colony.createdAt).fromNow()}</div>
                                <div>{colony.active ? "Yes" : "No"}</div>
                                <div>{colony.president ? colony.president.firstname + " " + colony.president.lastname : ""}</div>
                                <div>{colony.treasurer ? colony.treasurer.firstname + " " + colony.treasurer.lastname : ""}</div>
                                <div>{colony.secretary ? colony.secretary.firstname + " " + colony.secretary.lastname : ""}</div>
                                <div>{ColonyWebTypes.valueOf(colony.type)?.label}</div>
                                <Link href={"/administration/residences/" + colony.id} passHref className="text-right">
                                    <IconButton size="small" title={colony.type === 'APARTMENTS' ? 'Apartments' : 'Houses'}>
                                        <MdOutlineHolidayVillage fontSize="inherit"
                                                                 className="fill-current group-hover:fill-gray-800"/>
                                    </IconButton>
                                </Link>
                                <Link href={"/administration/tags/" + colony.id} passHref className="text-right">
                                    <IconButton size="small" title="Tags">
                                        <FaTags fontSize="inherit"
                                                                 className="fill-current group-hover:fill-gray-800"/>
                                    </IconButton>
                                </Link>
                                <Link href={"/administration/colonies/detail/" + colony.id} passHref
                                      className="text-right">
                                    <IconButton size="small" title="Detail">
                                        <MdListAlt fontSize="inherit"
                                                   className="fill-current group-hover:fill-gray-800"/>
                                    </IconButton>
                                </Link>
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
