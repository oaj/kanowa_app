"use client"
import {useRef, useState} from "react";
import {Formik, Field, Form, ErrorMessage, useFormik} from "formik";
import * as Yup from "yup";

import {IUser} from "@/types/user.type";
import {IResidence} from "@/types/residence.type";
import {ContactWizard} from "../common/ContactWizard";
import {Button} from "@mui/material";
import revalidateUrl from "@/services/revalidate.service";
import {saveResidence} from "@/services/residence.service";
import {IColony} from "@/types/colony.type";
import {IResidenceTag} from "@/types/residence.tag.type";
import {capitalizeFirstLetter} from "@/lib/Kanowa.Utils";
import {saveResidenceTag} from "@/services/residence.tag.service";
import TextFieldFormikMui from "@/components/common/formik.mui/TextField";

export const revalidate = 1

const ResidenceTagManagementDialog = ({colony, residenceTag}:
                                       {
                                           colony: IColony,
                                           residenceTag: IResidenceTag | null,
                                       }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");

    const id = residenceTag?.id || null

    const initialValues = useRef({
        name: residenceTag?.name || '',
    });

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(1, 'Must be 1 to 20 characters')
            .max(20, 'Must be 1 to 20 characters')
            .required("This field is required!"),
    });

    const handleSaveResidenceTag = (formValue: {
        name: string,
    }) => {
        const {name} = formValue;

        setMessage("");
        console.log('Handle Save ResidenceTag')
        console.log("name", name);

        setLoading(true);

        saveResidenceTag(id, colony.id as number, name).then(
            (response) => {
                const {residence, error} = response
                setLoading(false)
                if (residence) {
                    // revalidateUrl('/administration/residences/').then(value => {
                    //         console.log(value)
                    //         window.history.back()
                    //     }
                    // )
                    console.log('Created new residenceTag', residenceTag)
                    window.history.back()
                }
                if (error) {
                    console.log('dialog - error', error)
                    if (error.field === 'name') {
                        setNameError(error.message)
                    } else {
                        setMessage(error.message)
                    }
                }
            }
            ,
            (error) => {
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
        )
        ;
    };

    const handleCancel = () => {
        window.history.back()
    }

    const formik = useFormik({
        initialValues: initialValues.current,
        validationSchema: validationSchema,
        onSubmit: handleSaveResidenceTag
    });

    return (
        // <div className="dialog-layout">
        <div className="p-2">
            <div className="flex-row">
                <div className="text-2xl">{id ? 'Edit' : 'Create'} new tag</div>
                <div className="text-xl">{initialValues.current.name} in {colony.name}</div>
            </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-2 pt-4">
                        <TextFieldFormikMui formik={formik} name="name" label="Name" className="mt-2"/>
                        <div className="text-red-400">{nameError}</div>
                        <div className="flex place-content-between gap-2">
                            <Button type="button" variant="outlined" color="warning" disabled={loading} onClick={handleCancel}>
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
        </div>
    );
};

export default ResidenceTagManagementDialog;
