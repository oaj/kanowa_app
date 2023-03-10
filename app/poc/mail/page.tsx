"use client"
import React, {useState} from 'react'
import {useFormik} from "formik";
import {useRef} from "react";
import * as Yup from "yup";
import {Button} from "@mui/material";
import TextFieldFormikMui from "@/components/common/formik.mui/TextField";
import {sendMail} from "@/services/mail.service";

export default function MailDemoPage() {

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const initialValues = useRef({
        to: "oaj@amfibia.dk",
        subject: "Test mail",
        body: "This is a test mail"
    });

    const validationSchema = Yup.object().shape({
        to: Yup.string().email("Must be a valid email !").required("Field is required!"),
        subject: Yup.string()
            .min(5, 'Must be 5 to 50 characters')
            .max(50, 'Must be 5 to 50 characters')
            .required("This field is required!"),
        body: Yup.string()
            .min(2, 'Must be 5 to 50 characters')
            .max(50, 'Must be 5 to 50 characters')
            .required("This field is required!"),
    });

    const handleSendMail = (formValue: {
        to: string,
        subject: string,
        body: string,
    }) => {
        console.log('handleSendMail', handleSendMail)
        const {to, subject, body} = formValue;

        setMessage("");

        console.log("to", to);
        console.log("subject", subject);
        console.log("body", body);

        setLoading(true);

        sendMail(to, subject, body).then(
            (response) => {
                setLoading(false)
                const {info, error} = response
                console.log('info', info)
                console.log('error', error)
                if (info) {
                    setMessage('Mail sent successfully')
                }
                if (error) {
                    console.log('dialog - error', error)
                    setMessage(error.message)
                }
            },
            (error) => {
                console.log('exception', error);
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                const key = error.response?.data?.key;
                setMessage(key + ' : ' + resMessage);
            }
        );
    };
    const handleCancel = () => {
        window.history.back()
    }

    const formik = useFormik({
        initialValues: initialValues.current,
        validationSchema: validationSchema,
        onSubmit: handleSendMail
    });

    return (
        <div>
            <h3>Mail demo</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-3 pt-4">
                    <TextFieldFormikMui formik={formik} name="to" label="To" className="mt-2"/>
                    <TextFieldFormikMui formik={formik} name="subject" label="Subject"/>
                    <TextFieldFormikMui formik={formik} name="body" label="Body" multiline={true} rows="5"/>
                    <div className="flex place-content-between gap-2 mb-9">
                        <Button type="button" variant="outlined" color="warning" disabled={loading}
                                onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="outlined" color="primary" disabled={loading}>
                            {loading && (
                                <span className="">Loading...</span>
                            )}
                            Send
                        </Button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </div>
            </form>

        </div>
    )
}