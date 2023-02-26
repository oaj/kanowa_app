"use client"
import {Colony, User} from "@prisma/client";
import {ChangeEvent, useEffect, useState} from "react";
import {ColonyPlus, ColonyWebTypes, IColony} from "@/types/colony.type";
import * as React from "react";
import {MdAddBusiness, MdCancel, MdEdit, MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import moment from "moment/moment";
import Link from "next/link";
import {IconButton} from "@mui/material";
import TableHeaderRow from "@/components/table/TableHeaderRow";
import TableHeaderCell from "@/components/table/TableHeaderCell";
import TableDataRow from "@/components/table/TableDataRow";
import {IResidence, ResidencePlus} from "@/types/residence.type";

type SortType = "doorNumber";
const sortFields = {
    "doorNumber": (residence: IResidence) => residence.doorNumber,
}

const Residences = ({colonyId, colonyName, residences}: { colonyId: number, colonyName: string, residences: IResidence[] }) => {
    const [filteredSortedResidences, setFilteredSortedResidences] = useState<IResidence[]>([]);

    const [sort, setSort] = useState<SortType>("doorNumber");
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

    const sorter = (a: IResidence, b: IResidence) => {
        const valA = sortFields[sort](a)
        const valB = sortFields[sort](b)
        return number(ascending) * valA.localeCompare(valB)
    }

    const changeFilterText = (event: ChangeEvent) => {
        setFilterText((event.target as HTMLInputElement).value);
        console.log('filterText', filterText)
    }

    useEffect(() => {

        let fsResidences: IResidence[] | null;
        fsResidences = residences?.sort((a, b) => sorter(a, b))
            .filter(residence => filterText ? (residence.doorNumber.toLowerCase().includes(filterText.toLowerCase())) : true);
        setFilteredSortedResidences(fsResidences)

    }, [residences, ascending, sort, filterText])

    const handleClearNameFilter = () => {
        setFilterText("")
    }

    const styles = {
        colonyColumns: "grid grid-cols-[1fr_1fr_1fr_1fr_0.2fr] gap-x-2 p-2",
    }

    return (
        <div>
            <div className="">
                <h2 className="text-center">Recidencies in {colonyName}</h2>
                <Link href={"/administration/residences/create/" + colonyId} className="">
                    <IconButton aria-label="delete" size="medium">
                        <MdAddBusiness className="addIcon xx-large no-events"/>
                        New Residence
                    </IconButton>
                </Link>
            </div>
            <div className="bg-gray-800 flex gap-2 items-center px-4 py-2">
                <div className="flex-1">Set filter:</div>
                By Name <input className="rounded-2xl" autoFocus value={filterText} onChange={changeFilterText}/>
                <MdCancel className="cursor-pointer text-xl" onClick={handleClearNameFilter}/>
            </div>
            <div>
                <TableHeaderRow className={styles.colonyColumns}>
                    <TableHeaderCell title="Door" sortKey="name" sort={sort} ascending={ascending}
                                     onClick={() => setSorting("doorNumber")}/>
                    <TableHeaderCell title="Owner"/>
                    <TableHeaderCell title="Tenant"/>
                    <TableHeaderCell title="Responsible"/>
                    <TableHeaderCell className="text-right"/>
                </TableHeaderRow>
                {
                    filteredSortedResidences
                        .map((residence) => (
                            <TableDataRow href={"administration/residences/detail/" + residence.id}
                                          className={styles.colonyColumns}
                                          key={residence.id.toString()}>
                                <div>{residence.doorNumber}</div>
                                <div>{residence.owner ? residence.owner.firstname + " " + residence.owner.lastname : ""}</div>
                                <div>{residence.tenant ? residence.tenant.firstname + " " + residence.tenant.lastname : ""}</div>
                                <div>{residence.responsible ? residence.responsible.firstname + " " + residence.responsible.lastname : ""}</div>
                                <Link href={"/administration/residences/edit/" + residence.id} passHref className="text-right">
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
export default Residences;
