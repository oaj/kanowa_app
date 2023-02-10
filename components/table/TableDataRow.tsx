import Link from "next/link";
import {ReactNode} from "react";

type Props = {
    href: string,
    key: string,
    className: string,
    children: ReactNode,
}
function TableDataRow({href, key, className, children} : Props ) {
    return (
        <Link href={href}
              className={className + " group items-center text-current hover:text-gray-800 hover:bg-gray-100 no-underline" +
                  " border-0 border-b border-gray-500 border-solid"}
              key={key}>
            <>{children}</>
        </Link>
        )
}
export default TableDataRow