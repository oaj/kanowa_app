"use client"
import {useState} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {RoleTypes} from "@/types/user.type";
import {Role, User} from "@prisma/client";
import {saveManagedUser} from "@/services/user.service";
import {Button} from "@mui/material";
import revalidateUrl from "@/services/revalidate.service";

const UserManagementDialog = ({user}: { user: User | null }) => {

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
        email: user.email ? user.email : '',
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
                // revalidateUrl('/administration/users/').then(value => {
                //         console.log(value)
                //         window.history.back()
                //     }
                // )
                window.history.back()
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
            <div className="p-2">
                <div className="flex-row">
                    <div className="text-2xl">{id ? "Edit" : "Create"}</div>
                    <div className="text-xl">{initialValues.firstname} {initialValues.lastname} </div>
                </div>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSaveUser}
                >
                    <Form>
                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <label htmlFor="firstname">First Name</label>
                                    <Field name="firstname" type="text" className="form-control"/>
                                    <ErrorMessage
                                        name="firstname"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="lastname">Last Name</label>
                                    <Field name="lastname" type="text" className="form-control"/>
                                    <ErrorMessage
                                        name="lastname"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="text" className="form-control"/>
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="alert alert-danger"
                                    />

                                </div>
                                <div className="flex flex-col">
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
                                </div>
                            </div>
                            <div className="flex place-content-between gap-2">
                                <Button type="button" color="warning" disabled={loading}
                                        onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"/>
                                    )}
                                    {id ? "Save" : "Create"}
                                </Button>
                            </div>

                            {message && (
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            )}
                        </div>
                    </Form>
                </Formik>
            </div>
    );
};
export default UserManagementDialog;
