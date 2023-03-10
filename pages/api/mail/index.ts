import {NextApiRequest, NextApiResponse} from "next";
import {sendEmail} from "@/lib/email";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const {to, subject, body}: {to: string, subject: string, body: string} = req.body

        console.log('to', to)
        console.log('subject', subject)
        console.log('body', body)

        const emailPayload = {
            to: to,
            subject: subject,
            html: body
        }
        try {
            const info = await sendEmail(emailPayload)
            return res.status(200).json({info: info})
        } catch (error: any) {
            return res.status(400).json({error: error})
        }
    }
}

export default handler
