"use client"
import {Colony, User} from "@prisma/client";
import {ChangeEvent, useEffect, useState} from "react";
import {ColonyTypes} from "@/types/colony.type";
import * as React from "react";
import {MdCancel, MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import moment from "moment/moment";
import Link from "next/link";
import "./Colonies.css"

type ColonyPlus = Colony & { president: User, treasurer: User, secretary: User }

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

    return (
        <div>
            <div className="actionBar">
                <div className="filler">Set filter:</div>
                By Name <input className="search-box" autoFocus value={filterName} onChange={changeName}/>
                <MdCancel className="filterCancelIcon larger" onClick={handleClearNameFilter}/>
            </div>
            <div>
                <div className="colonies-tableRow tableRow tableHeader">
                    <div className="tableHeaderSortCell" onClick={sortByName}>
                        Name
                        {sort === "name" && (ascending ? <MdKeyboardArrowUp className="no-events"/> :
                            <MdKeyboardArrowDown className="no-events"/>)}
                    </div>
                    <div className="tableHeaderSortCell" onClick={sortByCreated}>
                        Created
                        {sort === "created" && (ascending ? <MdKeyboardArrowUp className="no-events"/> :
                            <MdKeyboardArrowDown className="no-events"/>)}
                    </div>
                    <div className="tableHeaderSortCell" onClick={sortByActive}>
                        Active
                        {sort === "active" && (ascending ? <MdKeyboardArrowUp className="no-events"/> :
                            <MdKeyboardArrowDown className="no-events"/>)}
                    </div>
                    <div>President</div>
                    <div>Treasurer</div>
                    <div>Secretary</div>
                    <div className="tableHeaderSortCell" onClick={sortByType}>
                        Type
                        {sort === "type" && (ascending ? <MdKeyboardArrowUp className="no-events"/> :
                            <MdKeyboardArrowDown className="no-events"/>)}
                    </div>
                </div>
                {
                    filteredSortedColonies
                        .map((colony) => (
                            <Link href={"detail/" + colony.id} id={colony.id.toString()}
                                  className="colonies-tableRow tableRow tableData" key={colony.id}>
                                <div>{colony.name}</div>
                                <div>{moment(colony.createdAt).fromNow()}</div>
                                <div>{colony.active ? "Yes" : "No"}</div>
                                <div>{colony.president ? colony.president.firstname + " " + colony.president.lastname : ""}</div>
                                <div>{colony.treasurer ? colony.treasurer.firstname + " " + colony.treasurer.lastname : ""}</div>
                                <div>{colony.secretary ? colony.secretary.firstname + " " + colony.secretary.lastname : ""}</div>
                                <div>{ColonyTypes.valueOf(colony.type)?.label}</div>
                            </Link>
                        ))
                }
            </div>
        </div>
    );
}
export default Colonies;
