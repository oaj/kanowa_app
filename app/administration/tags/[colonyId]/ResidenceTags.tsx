"use client"
import {ChangeEvent, useEffect, useState} from "react";
import * as React from "react";
import {MdAddBusiness, MdCancel, MdEdit, MdListAlt} from "react-icons/md";
import Link from "next/link";
import {IconButton} from "@mui/material";
import TableHeaderRow from "@/components/table/TableHeaderRow";
import TableHeaderCell from "@/components/table/TableHeaderCell";
import TableDataRow from "@/components/table/TableDataRow";
import {IResidence} from "@/types/residence.type";
import {IResidenceTag} from "@/types/residence.tag.type";

type SortType = "name";
const sortFields = {
    "name": (residenceTag: IResidenceTag) => residenceTag.name,
}

const ResidenceTags = ({
                           colonyId,
                           colonyName,
                           residenceTags
                       }: { colonyId: number, colonyName: string, residenceTags: IResidenceTag[] }) => {
    const [filteredSortedResidenceTags, setFilteredSortedResidenceTags] = useState<IResidenceTag[]>([]);

    const [sort, setSort] = useState<SortType>("name");
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
        const sorter = (a: IResidenceTag, b: IResidenceTag) => {
            const valA = sortFields[sort](a)
            const valB = sortFields[sort](b)
            return number(ascending) * valA.localeCompare(valB)
        }

        let fsResidenceTags: IResidenceTag[] | null;
        fsResidenceTags = residenceTags?.sort((a, b) => sorter(a, b))
            .filter(residenceTag => filterText ? (residenceTag.name.toLowerCase().includes(filterText.toLowerCase())) : true);
        setFilteredSortedResidenceTags(fsResidenceTags)

    }, [residenceTags, ascending, sort, filterText])

    const handleClearNameFilter = () => {
        setFilterText("")
    }

    const styles = {
        colonyColumns: "grid grid-cols-[1fr_0.3fr] gap-x-2 p-2",
    }

    return (
        <div>
            <div className="">
                <h2 className="text-center">{residenceTags.length} Tags in {colonyName}</h2>
                <Link href={"/administration/tags/create/" + colonyId} className="">
                    <IconButton title="New Tag" size="small">
                        <MdAddBusiness className="addIcon xx-large no-events"/>
                        New Tag
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
                    <TableHeaderCell title="Name" sortKey="name" sort={sort} ascending={ascending}
                                     onClick={() => setSorting("name")}/>
                    <TableHeaderCell className="text-right"/>
                </TableHeaderRow>
                {
                    filteredSortedResidenceTags
                        .map((residenceTag) => (
                            <TableDataRow key={residenceTag.id.toString()} className={styles.colonyColumns}>
                                <div>{residenceTag.name}</div>
                                <Link href={"/administration/tags/edit/" + colonyId + "/" + residenceTag.id} passHref
                                      className="text-right">
                                    <IconButton size="small" title="Edit">
                                        <MdEdit fontSize="inherit"
                                                className="fill-current group-hover:fill-gray-800"/>
                                    </IconButton>
                                </Link>
                            </TableDataRow>
                        ))
                }
            </div>
        </div>
    );
}
export default ResidenceTags;
