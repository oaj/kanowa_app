import type { NextApiRequest, NextApiResponse } from "next"
import {sendEmail} from "@/lib/email";
import WelcomeEmail from "@/emails/WelcomeTemplate";
import {render} from "@react-email/render";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('Sending email')
    const info: SMTPTransport.SentMessageInfo = await sendEmail({
        to: "oaj@amfibia.dk",
        subject: "Welcome to NextAPI",
        html: render(WelcomeEmail()),
    })
    console.log('Email sent')
    console.log('info', info)

    return res.status(200).json({ message: "Email sent successfully" })
}
