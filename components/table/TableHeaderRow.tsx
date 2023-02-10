import {ReactNode} from "react";

type Props = {
    className: string,
    children: ReactNode,
}
function TableHeaderRow({className, children} : Props ) {
    return (
        <div className={className + " bg-gray-700"}>
            <>{children}</>
        </div>
        )
}
export default TableHeaderRow