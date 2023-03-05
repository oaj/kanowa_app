"use client"
import {useRef, useState} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";

import {IUser} from "@/types/user.type";
import {ColonyPlus, ColonyWebTypes, IColony} from "@/types/colony.type";
import {saveColony} from "@/services/colony.service";
import {ContactWizard} from "../common/ContactWizard";
import {Button} from "@mui/material";
import revalidateUrl from "@/services/revalidate.service";

export const revalidate = 1

const ColonyManagementDialog = ({colony}: { colony: IColony }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const id = colony.id || null

    const emptyUser: IUser = {
        id: null,
        email: "",
        firstname: "",
        lastname: "",
        role: null,
        phone: "",
        active: false,
        createdAt: null,
    };
    const [president, setPresident] = useState(colony.president ? colony.president : emptyUser);
    const [treasurer, setTreasurer] = useState(colony.treasurer ? colony.treasurer : emptyUser);
    const [secretary, setSecretary] = useState(colony.secretary ? colony.secretary : emptyUser);

    const initialValues = useRef({
        name: colony.name,
        address: colony.address,
        nearBy: colony.nearBy,
        city: colony.city,
        roleNotificationsSuspended: colony.roleNotificationsSuspended,
        active: colony.active,
        type: colony.type || "",
    });

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, 'Must be 5 to 50 characters')
            .max(50, 'Must be 5 to 50 characters')
            .required("This field is required!"),
        address: Yup.string()
            .min(5, 'Must be 5 to 50 characters')
            .max(50, 'Must be 5 to 50 characters')
            .required("This field is required!"),
        nearBy: Yup.string()
            .min(5, 'Must be 5 to 50 characters')
            .max(50, 'Must be 5 to 50 characters')
            .required("This field is required!"),
        city: Yup.string()
            .min(2, 'Must be 5 to 50 characters')
            .max(50, 'Must be 5 to 50 characters')
            .required("This field is required!"),
        type: Yup.string().required("This field is required!")
    });

    const handleSaveColony = (formValue: {
        name: string,
        address: string,
        nearBy: string,
        city: string,
        roleNotificationsSuspended: boolean,
        active: boolean,
        type: string
    }) => {
        const {name, address, nearBy, city, roleNotificationsSuspended, active, type} = formValue;

        setMessage("");

        console.log("name", name);
        console.log("active", active);
        console.log("type", type);
        console.log("roleNotificationsSuspended", roleNotificationsSuspended);
        console.log("president", president);
        console.log("treasurer", treasurer);
        console.log("secretary", secretary);

        setLoading(true);

        saveColony(id, name, address, nearBy, city, roleNotificationsSuspended, active, type, president, treasurer, secretary).then(
            () => {
                // revalidateUrl('/administration/colonies/').then(value => {
                //         console.log(value)
                //         window.history.back()
                //     }
                // )
                window.history.back()
            },
            (error) => {
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
        // <div className="dialog-layout">
        <div className="p-2">
            <div className="flex-row">
                <div className="text-2xl">Edit</div>
                <div className="text-xl">{initialValues.current.name}</div>
            </div>
            <Formik
                // enableReinitialize
                initialValues={initialValues.current}
                validationSchema={validationSchema}
                onSubmit={handleSaveColony}
            >
                <Form>
                    <div className="flex flex-col gap-2 pt-4">
                        <ContactWizard fieldName="President" user={president}
                                       scopeUsers={[treasurer, secretary]} emailRequired={true}
                                       setUser={setPresident}/>
                        <ContactWizard fieldName="Treasurer" user={treasurer}
                                       scopeUsers={[president, secretary]} emailRequired={true}
                                       setUser={setTreasurer}/>
                        <ContactWizard fieldName="Secretary" user={secretary}
                                       scopeUsers={[president, treasurer]} emailRequired={true}
                                       setUser={setSecretary}/>
                        <div className="flex flex-col">
                            <label htmlFor="name">Colony name</label>
                            <Field name="name" type="text" className="form-control"/>
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="alert alert-danger"
                            />
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
                        <div className="flex flex-col place-items-end">
                            <label className="w-full justify-self-start" htmlFor="roleNotificationsSuspended">
                                Role Notifications Suspended
                            </label>
                            <Field id="roleNotificationsSuspended" name="roleNotificationsSuspended" type="checkbox"/>
                            <ErrorMessage
                                name="roleNotificationsSuspended"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="flex flex-col place-items-end">
                            <label className="w-full justify-self-start" htmlFor="active">Active</label>
                            <Field id="active" name="active" type="checkbox"/>
                            <ErrorMessage
                                name="active"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="type">Colony type</label>
                            <Field
                                name="type"
                                as="select"
                                options={ColonyWebTypes.values}
                                className="custom-select"
                                placeholder="Select a type..."
                            >
                                <option value="">Select a type</option>
                                {ColonyWebTypes.values.map((type) => {
                                    return (
                                        <option key={type.key} value={type.key}>{type.label}</option>
                                    )
                                })}
                            </Field>
                            <ErrorMessage
                                name="type"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="flex place-content-between gap-2">
                            <Button type="button" color="warning" disabled={loading} onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" disabled={loading}>
                                {loading && (
                                    <span className="">Loading...</span>
                                )}
                                Save
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
                </Form>
            </Formik>
        </div>
    );
};

export default ColonyManagementDialog;
