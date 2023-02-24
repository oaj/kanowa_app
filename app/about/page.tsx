"use client"
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {useTranslation} from "next-i18next";
import {NextPage} from "next";
import about from "public/locales/en/about.json";

const About: NextPage = () => {
    const {t} = useTranslation('about');
    const { push } = useRouter()

    return (
        <>
            <h1>Locale: {}</h1>

            <h2>{t('about')}</h2>
            <h2>{t('hello world')}</h2>

            <h2>
                <div className="flex gap-2 text-white bg-gray-500">
                <Link href='/'>Go to home</Link>
                <Link href='/about' locale={'es'}>Spain - About</Link>
                <Link href='/about' locale={'en'}>English  - About</Link>
                </div>
            </h2>
        </>
    )
}


// type Props = {
//     locale: string
// }
//
// export async function getStaticProps({ locale }: Props) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, [
//                 'common',
//                 'about',
//             ])),
//             // Will be passed to the page component as props
//         },
//     }
// }
export default About