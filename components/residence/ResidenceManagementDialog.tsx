"use client"
import {useRef, useState} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";

import {IUser} from "@/types/user.type";
import {IResidence, ResidencePlus} from "@/types/residence.type";
import {ContactWizard} from "../common/ContactWizard";
import {Button} from "@mui/material";
import revalidateUrl from "@/services/revalidate.service";
import {saveResidence} from "@/services/residence.service";
import {IColony} from "@/types/colony.type";

export const revalidate = 1

const ResidenceManagementDialog = ({colony, residence}: {colony: IColony, residence: IResidence | null}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const id = residence?.id || null

    const emptyUser: IUser = {
        id: null,
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
    };
    const [owner, setOwner] = useState(residence?.owner ? residence.owner : emptyUser);
    const [tenant, setTenant] = useState(residence?.tenant ? residence.tenant : emptyUser);
    const [responsible, setResponsible] = useState(residence?.responsible ? residence.responsible : emptyUser);

    const initialValues = useRef({
        doorNumber: residence?.doorNumber || '',
        residenceTags: residence?.residenceTags.map(tag => tag.name) || []
    });

    const validationSchema = Yup.object().shape({
        doorNumber: Yup.string()
            .min(1, 'Must be 1 to 20 characters')
            .max(20, 'Must be 1 to 20 characters')
            .required("This field is required!"),
    });

    const handleSaveColony = (formValue: {
        doorNumber: string,
        residenceTags: string[],
    }) => {
        const {doorNumber, residenceTags} = formValue;

        setMessage("");

        console.log("doorNumber", doorNumber);
        console.log("owner", owner);
        console.log("tenant", tenant);
        console.log("responsible", responsible);

        setLoading(true);

        saveResidence(id, colony.id as number, doorNumber, residenceTags, owner, tenant, responsible).then(
            () => {
                // revalidateUrl('/administration/residences/').then(value => {
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
                <div className="text-xl">{initialValues.current.doorNumber} in {colony.name}</div>
            </div>
            <Formik
                // enableReinitialize
                initialValues={initialValues.current}
                validationSchema={validationSchema}
                onSubmit={handleSaveColony}
            >
                <Form>
                    <div className="flex flex-col gap-2 pt-4">
                        <ContactWizard fieldName="Owner" user={owner}
                                       scopeUsers={[tenant, responsible]} emailRequired={true}
                                       setUser={setOwner}/>
                        <ContactWizard fieldName="Tenant" user={tenant}
                                       scopeUsers={[owner, responsible]} emailRequired={true}
                                       setUser={setTenant}/>
                        <ContactWizard fieldName="Responsible" user={responsible}
                                       scopeUsers={[owner, tenant]} emailRequired={true}
                                       setUser={setResponsible}/>
                        <div className="flex flex-col">
                            <label htmlFor="doorNumber">Door number</label>
                            <Field name="doorNumber" type="text" className="form-control"/>
                            <ErrorMessage
                                name="doorNumber"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="flex flex-col">

                            <label htmlFor="residenceTags">Tags</label>
                            <Field
                                component="select"
                                id="residenceTags"
                                name="residenceTags"
                                multiple={true}
                            >
                                <option value="NY">New York</option>
                                <option value="SF">San Francisco</option>
                                <option value="CH">Chicago</option>
                                <option value="OTHER">Other</option>
                            </Field>
                            <ErrorMessage
                                name="residenceTags"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        {/*<div className="flex flex-col">*/}
                        {/*    <label htmlFor="residenceTags">Tags</label>*/}
                        {/*    <Field*/}
                        {/*        name="residenceTags"*/}
                        {/*        as="select"*/}
                        {/*        options={residence.residenceTags     ColonyWebTypes.values}*/}
                        {/*        className="custom-select"*/}
                        {/*        placeholder="Select a type..."*/}
                        {/*    >*/}
                        {/*        <option value="">Select a type</option>*/}
                        {/*        {ColonyWebTypes.values.map((type) => {*/}
                        {/*            return (*/}
                        {/*                <option key={type.key} value={type.key}>{type.label}</option>*/}
                        {/*            )*/}
                        {/*        })}*/}
                        {/*    </Field>*/}
                        {/*    <ErrorMessage*/}
                        {/*        name="type"*/}
                        {/*        component="div"*/}
                        {/*        className="alert alert-danger"*/}
                        {/*    />*/}
                        {/*</div>*/}
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

export default ResidenceManagementDialog;