import Link from "next/link";
import {ReactNode} from "react";

type Props = {
    href?: string,
    className?: string,
    children: ReactNode,
}
function TableDataRow({className, children} : Props ) {
    return (
        <div className={className + " group items-center text-current hover:text-gray-800 hover:bg-gray-100 no-underline" +
                  " border-0 border-b border-gray-500 border-solid"}>
            <>{children}</>
        </div>
        )
}
export default TableDataRow