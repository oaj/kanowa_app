export default function revalidateUrl(url: string) {

    console.log('url', url)
    console.log('process.env.NEXT_PUBLIC_NEXTAUTH_URL', process.env.NEXT_PUBLIC_NEXTAUTH_URL)
    console.log('process.env.NEXT_PUBLIC_MY_SECRET_REVALIDATE_TOKEN', process.env.NEXT_PUBLIC_MY_SECRET_REVALIDATE_TOKEN)
    return fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + '/api/revalidate/?secret=' + process.env.NEXT_PUBLIC_MY_SECRET_REVALIDATE_TOKEN + '&url=' + url, {
        method: 'GET',
        headers: {
            'Content-type': 'Application/json',
        }
    }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return response.statusText
            }
        }
    )
}