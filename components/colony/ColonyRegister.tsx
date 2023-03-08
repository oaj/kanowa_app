"use client"
import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";

import {registerColony} from "@/services/colony.service";
import {Button} from "@mui/material";
import TextFieldFormikMui from "@/components/common/formik.mui/TextField";

const ColonyRegister = () => {
    const [successful, setSuccessful] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");


    const initialValues = {
        name: "",
        address: "",
        nearBy: "",
        city: "",
        firstname: "",
        lastname: "",
        email: "",
        president: null
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .test(
                "len",
                "The colony name must be between 3 and 20 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
            )
            .required("This field is required!"),
        address: Yup.string()
            .required("This field is required!"),
        nearBy: Yup.string()
            .required("This field is required!"),
        city: Yup.string()
            .required("This field is required!"),
        firstname: Yup.string()
            .required("This field is required!"),
        lastname: Yup.string()
            .required("This field is required!"),
        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),
    });

    type ColonyRegisterProps = {
        name: string,
        address: string,
        nearBy: string,
        city: string,
        firstname: string,
        lastname: string,
        email: string
    };

    const handleCancel = () => {
        window.history.back()
    }

    const handleRegisterColony = async (formValue: ColonyRegisterProps) => {
        console.log("handleRegisterColony");
        const {
            name,
            address,
            nearBy,
            city,
            firstname,
            lastname,
            email
        } = formValue;

        setLoading(true);
        setNameError('')
        registerColony(
            name,
            address,
            nearBy,
            city,
            firstname,
            lastname,
            email
        ).then(response => {
            setLoading(false);
            const {colony, error} = response
            console.log('handleRegisterColony - data', colony)
            console.log('handleRegisterColony - error', error)
            if (colony) {
                console.log('Registered colony', colony)
                setMessage('Registered ' + colony.name)
                setSuccessful(true);
            }
            if (error) {
                if (error.field === 'name') setNameError(error.message)
                else setMessage(error.message)
                setSuccessful(false);
            }
        })
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleRegisterColony
    });

    return (
        <div className="p-2">
            <div className="text-2xl pt-4">Register kanowa</div>
            <form onSubmit={formik.handleSubmit}>
                    {!successful && (
                        <div className="flex flex-col gap-2 pt-4">
                            <TextFieldFormikMui formik={formik} name="name" label="Name"/>
                            {nameError && <div className="text-red-500">{nameError}</div>}
                            <TextFieldFormikMui name="address" formik={formik} label="Address" multiline={true} rows="4"/>
                            <TextFieldFormikMui formik={formik} name="nearBy" label="Near by"/>
                            <TextFieldFormikMui formik={formik} name="city" label="City"/>
                            <div className="text-xl pt-4">President:</div>
                            <TextFieldFormikMui formik={formik} name="firstname" label="Firstname"/>
                            <TextFieldFormikMui formik={formik} name="lastname" label="Lastname"/>
                            <TextFieldFormikMui formik={formik} name="email" label="Email"/>

                            <div className="flex place-content-between gap-2">
                                <Button type="button" color="warning" variant="outlined" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary" variant="outlined" disabled={loading}>
                                    {loading && (
                                        <span className="">Loading...</span>
                                    )}
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="">
                            <div
                                className={
                                    successful ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                </form>
        </div>
    );
};

export default ColonyRegister;
