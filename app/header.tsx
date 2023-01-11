import Link from 'next/link'

export const Header = () => {
    return (
        <div className="flex gap-4 bg-slate-400 font-extrabold underline">
            <Link href='/'>Home</Link>
            <Link href='/users'>Users</Link>
        </div>
    )
}