import nodemailer from "nodemailer"

type EmailPayload = {
    to: string
    subject: string
    html: string
}

// Replace with your SMTP credentials
const smtpOptions = {
    host: process.env.SMTP_HOST as string,
    port: parseInt(process.env.SMTP_PORT as string),
    secure: false,
    auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASSWORD as string,
    },
}

export const sendEmail = async (data: EmailPayload) => {
    const transporter = nodemailer.createTransport({
        ...smtpOptions,
    })

    return await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        ...data,
    })
}
