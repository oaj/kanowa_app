import { CssMenu } from '@/components/menu/CssMenu'
import Link from 'next/link'

export const Header = () => {
    return (
        <CssMenu currentUser={undefined} />
        // <div className="flex gap-4 bg-slate-400 font-extrabold underline">
        //     <Link href='/'>Home</Link>
        //     <Link href='/users'>Users</Link>
        // </div>
    )
}