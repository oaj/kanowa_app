import React, {ReactNode} from "react";

type Props = {
    className?: string,
    onClick?: React.MouseEventHandler<HTMLDivElement>
    children?: ReactNode,
    sortByField?: any,
}
function TableHeaderCell({className, onClick, sortByField, children} : Props ) {

    // if (sortByField) {
    //     if (typeof sortByField ===  "string") {
    //
    //     } else if (typeof sortByField ===  "number") {
    //
    //     }
    // }

    return (
        <div className={className + " flex items-center" + (onClick ? " hover:font-bold hover:cursor-pointer": "")} onClick={onClick}>
            <>{children}</>
        </div>
    )
}
export default TableHeaderCell