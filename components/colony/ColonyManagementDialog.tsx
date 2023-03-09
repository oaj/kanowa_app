"use client"
import {useRef, useState} from "react";
import {Formik, Field, Form, ErrorMessage, useFormik} from "formik";
import * as Yup from "yup";

import {IUser} from "@/types/user.type";
import {ColonyPlus, ColonyWebTypes, IColony} from "@/types/colony.type";
import {saveColony} from "@/services/colony.service";
import {ContactWizard} from "../common/ContactWizard";
import {Button, FormControl, InputLabel, MenuItem} from "@mui/material";
import revalidateUrl from "@/services/revalidate.service";
import TextFieldFormikMui from "@/components/common/formik.mui/TextField";
import CheckboxFormikMui from "@/components/common/formik.mui/CheckBox";
import SelectFormikMui from "@/components/common/formik.mui/Select";

export const revalidate = 1

const ColonyManagementDialog = ({colony}: { colony: IColony }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [nameServerError, setNameServerError] = useState<string>("");
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
            (response) => {
                setLoading(false)
                const {colony, error} = response
                console.log('colony', colony)
                console.log('error', error)
                if (colony) {
                    // revalidateUrl('/administration/colonies/').then(value => {
                    //         console.log(value)
                    //         window.history.back()
                    //     }
                    // )
                    window.history.back()
                }
                if (error) {
                    console.log('dialog - error', error)
                    if (error.field === 'name') {
                        setNameServerError(error.message)
                    } else {
                        setMessage(error.message)
                    }
                }
            },
            (error) => {
                setLoading(false);
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
        onSubmit: handleSaveColony
    });

    return (
        // <div className="dialog-layout">
        <div className="p-2">
            <div className="flex-row">
                <div className="text-2xl">Edit</div>
                <div className="text-xl">{initialValues.current.name}</div>
            </div>
            {/*<Formik*/}
            {/*    // enableReinitialize*/}
            {/*    initialValues={initialValues.current}*/}
            {/*    validationSchema={validationSchema}*/}
            {/*    onSubmit={handleSaveColony}*/}
            {/*>*/}
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-3 pt-4">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <SelectFormikMui formik={formik} name="type" label="Type" labelId="demo-simple-select-label">
                            {ColonyWebTypes.values.map((type) => {
                                return (
                                    <MenuItem key={type.key} value={type.key}>{type.label}</MenuItem>
                                )
                            })}
                        </SelectFormikMui>
                    </FormControl>
                    <ContactWizard fieldName="President" user={president}
                                   scopeUsers={[treasurer, secretary]} emailRequired={true}
                                   setUser={setPresident}/>
                    <ContactWizard fieldName="Treasurer" user={treasurer}
                                   scopeUsers={[president, secretary]} emailRequired={true}
                                   setUser={setTreasurer}/>
                    <ContactWizard fieldName="Secretary" user={secretary}
                                   scopeUsers={[president, treasurer]} emailRequired={true}
                                   setUser={setSecretary}/>
                    <CheckboxFormikMui name="roleNotificationsSuspended" label="Role Notifications Suspended"
                                       formik={formik}/>
                    <CheckboxFormikMui name="active" label="Active" formik={formik}/>
                    <TextFieldFormikMui formik={formik} name="name" label="Name" className="mt-2"/>
                    <div className="text-red-400">{nameServerError}</div>
                    <TextFieldFormikMui name="address" formik={formik} label="Address" multiline={true} rows="4"/>
                    <TextFieldFormikMui formik={formik} name="nearBy" label="Near by"/>
                    <TextFieldFormikMui formik={formik} name="city" label="City"/>
                    <div className="flex place-content-between gap-2 mb-9">
                        <Button type="button" variant="outlined" color="warning" disabled={loading}
                                onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="outlined" color="primary" disabled={loading}>
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
            </form>
            {/*</Formik>*/}
        </div>
    );
};

export default ColonyManagementDialog;
