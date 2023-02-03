"use client"
import {useState} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import "./UserManagementDialog.css"
import {RoleTypes} from "@/types/user.type";
import {Role, User} from "@prisma/client";
import {saveManagedUser} from "@/services/user.service";

const UserManagementDialog = ({user}: {user: User | null} ) => {

    console.log('UserManagementDialog.user', user)
    const id = user?.id
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const initialValues: {
        firstname: string,
        lastname: string,
        email: string,
        role: Role,
    } = user ? {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email ? user.email :'',
        role: user.role,
    } : {
        firstname: '',
        lastname: '',
        email: '',
        role: Role.NONE,
    };

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .min(2, 'Must be 2 to 50 characters')
            .max(50, 'Must be 2 to 50 characters')
            .required("This field is required!"),
        lastname: Yup.string()
            .min(2, 'Must be 2 to 50 characters')
            .max(50, 'Must be 2 to 50 characters')
            .required("This field is required!"),
        email: Yup.string()
            .email("Must be a valid email !")
            .required("Field is required!"),
        role: Yup.string()
            .required("Field is required!"),
    });

    const handleSaveUser = (formValue: { firstname: string, lastname: string, email: string, role: Role }) => {
        console.log('handleSaveUser')
        const {firstname, lastname, email, role} = formValue;

        setMessage("");

        console.log("firstname", firstname);
        console.log("lastname", lastname);
        console.log("email", email);
        console.log("role", role);

        setLoading(true);

        saveManagedUser(id, firstname, lastname, email, role).then(() => {
                setTimeout(function () {
                    window.history.back();
                }, 100);
                // todo hack, ellers når prisma ikke, at opdatere før listen af usere hentes på næste side ??
            },
            (error: any) => {
                console.log('error', error);
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                const key = error.response?.data?.key;

                setLoading(false);
                setMessage(key + ' : ' + resMessage);
            }
        );
    };

    const handleCancel = () => {
        window.history.back()
    }

    return (
        <div className="col-xl-12">
            <div className="card card-container">
                <div className="flex-row">
                    <div className="xx-large-text">{id ? "Edit" : "Create"}</div>
                    <div
                        className="x-large-text">{initialValues.firstname} {initialValues.lastname} </div>
                </div>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSaveUser}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <Field name="firstname" type="text" className="form-control"/>
                            <ErrorMessage
                                name="firstname"
                                component="div"
                                className="alert alert-danger"
                            />
                            <label htmlFor="lastname">Last Name</label>
                            <Field name="lastname" type="text" className="form-control"/>
                            <ErrorMessage
                                name="lastname"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="text" className="form-control"/>
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="alert alert-danger"
                        />

                        <label htmlFor="role">Role</label>
                        <Field
                            name="role"
                            as="select"
                            options={RoleTypes.values}
                            className="custom-select"
                            placeholder="Select a role..."
                        >
                            <option value="">Select a role</option>
                            {RoleTypes.values.filter(value => value !== RoleTypes.ROLE_USER).map((type) => {
                                return (
                                    <option key={type.key} value={type.key}>{type.label}</option>
                                )
                            })}
                        </Field>
                        <ErrorMessage
                            name="role"
                            component="div"
                            className="alert alert-danger"
                        />
                        <div className="vert-space2"/>
                        <div className="form-group">
                            <div className="flex-row">
                                <button type="button" className="btn btn-outline-danger" disabled={loading}
                                        onClick={handleCancel}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-outline-primary" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"/>
                                    )}
                                    {id ? "Save" : "Create"}
                                </button>
                            </div>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
export default UserManagementDialog;
