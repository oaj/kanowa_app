import React, {ReactNode} from "react";
import {SortType} from "../../app/administration/users/Users";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

type Props = {
    className?: string,
    onClick?: React.MouseEventHandler<HTMLDivElement>
    children?: ReactNode,
    title?: string,
    sortKey?: string,
    sort?: string,
    ascending?: boolean,
}

function TableHeaderCell({className, onClick, children, title, sortKey, sort, ascending} : Props ) {
    return (
        <div className={className + " flex items-center" + (onClick ? " hover:font-bold hover:cursor-pointer": "")} onClick={onClick}>
            {title}
            {sortKey && sort === sortKey && (ascending ? <MdKeyboardArrowUp className="pointer-events-none"/> :
                <MdKeyboardArrowDown className="pointer-events-none"/>)}
        </div>
    )
}
export default TableHeaderCell