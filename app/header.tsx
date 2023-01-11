import Link from 'next/link'

export const Header = () => {
    return (
        <div className="flex gap-4 bg">
            <Link href='/'>Home</Link>
            <Link href='/users'>Users</Link>
        </div>
    )
}