"use client"
import {FormEvent, useState} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";

import {registerColony} from "@/services/colony.service";
import {Button} from "@mui/material";

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

        const {data, error} = await registerColony(
            name,
            address,
            nearBy,
            city,
            firstname,
            lastname,
            email
        )
        console.log('handleRegisterColony - data', data)
        console.log('handleRegisterColony - error',error)
        if (error) {
            if (error.field === 'name') setNameError(error.message)
            else setMessage(error.message)
        }
        if (data) {
            setNameError('')
        }
        // setLoading(false);
        //         setMessage(resMessage)
        //         setSuccessful(false);
    };

    return (
        <div className="p-2">
            <div className="text-2xl pt-4">Register kanowa</div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleRegisterColony}
            >
                <Form>
                    {!successful && (
                        <div className="flex flex-col gap-2 pt-4">
                            <div className="flex flex-col">
                                <label htmlFor="name"> Name </label>
                                <Field id="name" name="name" type="text"/>
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="alert alert-danger"
                                />
                                <div className="text-red-400">{nameError}</div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="address"> Address</label>
                                <Field name="address" as="textarea"/>
                                <ErrorMessage
                                    name="address"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="nearBy"> Near by </label>
                                <Field name="nearBy" type="text"/>
                                <ErrorMessage
                                    name="nearBy"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="city"> City </label>
                                <Field name="city" type="text"/>
                                <ErrorMessage
                                    name="city"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="text-xl pt-4">President:</div>
                            <div className="flex flex-col">
                                <label htmlFor="firstname"> Firstname </label>
                                <Field name="firstname" type="text"/>
                                <ErrorMessage
                                    name="firstname"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="lastname"> Lastname </label>
                                <Field name="lastname" type="text"/>
                                <ErrorMessage
                                    name="lastname"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="email"> Email </label>
                                <Field name="email" type="email"/>
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="flex place-content-between gap-2">
                                <Button type="button" color="warning" onClick={handleCancel}>
                                {/*<Button type="button" color="warning" disabled={loading} onClick={handleCancel}>*/}
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary" >Sign Up</Button>
                                {/*<Button type="submit" color="primary" disabled={loading}>Sign Up</Button>*/}
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
                </Form>
            </Formik>
        </div>
    );
};

export default ColonyRegister;
