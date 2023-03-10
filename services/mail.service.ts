const API_URL = "http://localhost:3000/api/mail/";

export async function sendMail (to: string, subject: string, body: string) {
    console.log('SendMail')
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
        },
        body: JSON.stringify({
            to: to,
            subject: subject,
            body: body,
        })
    }).then(response => {
        return response.json();
    }).catch(reason => {
        return reason.message
    })
}