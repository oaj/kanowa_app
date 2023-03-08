"use client"
import {useRef, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {IUser} from "@/types/user.type";
import {IResidence} from "@/types/residence.type";
import {ContactWizard} from "../common/ContactWizard";
import {Button} from "@mui/material";
import {saveResidence} from "@/services/residence.service";
import {IColony} from "@/types/colony.type";
import {IResidenceTag} from "@/types/residence.tag.type";
import TextFieldFormikMui from "@/components/common/formik.mui/TextField";
import MultiSelectFormikMui from "@/components/common/formik.mui/MultiSelect";

export const revalidate = 1

type Props = {
    colony: IColony,
    residence: IResidence | null,
    residenceTags: IResidenceTag[] | undefined | null
}
const ResidenceManagementDialog = ({colony, residence, residenceTags}: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [doorNumberServerError, setDoorNumberServerError] = useState<string>("");

    const id = residence?.id || null

    const emptyUser: IUser = {
        id: null,
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
        role: null,
        active: true,
        createdAt: null,
    };
    const [owner, setOwner] = useState(residence?.owner ? residence.owner : emptyUser);
    const [tenant, setTenant] = useState(residence?.tenant ? residence.tenant : emptyUser);
    const [responsible, setResponsible] = useState(residence?.responsible ? residence.responsible : emptyUser);

    const initialValues = useRef({
        doorNumber: residence?.doorNumber || '',
        tags: residence?.residenceTags.map(tag => tag.name) as string[] || []
    });
    const validationSchema = Yup.object().shape({
        doorNumber: Yup.string()
            .min(1, 'Must be 1 to 20 characters')
            .max(20, 'Must be 1 to 20 characters')
            .required("This field is required!"),
    });

    const handleSaveResidence = (formValue: {
        doorNumber: string,
        tags: string[],
    }) => {
        const {doorNumber, tags} = formValue;

        const resTags = tags.map(tag => residenceTags?.find(residenceTag => residenceTag.name === tag))

        setMessage("");
        console.log('Handle Save Residence')
        console.log("doorNumber", doorNumber);
        console.log("owner", owner);
        console.log("tenant", tenant);
        console.log("responsible", responsible);
        console.log("resTags", resTags);

        setLoading(true);

            saveResidence(id, colony.id as number, doorNumber, resTags as IResidenceTag[], owner, tenant, responsible).then(
            (response) => {
                const {residence, error} = response
                setLoading(false)
                if (residence) {
                    // revalidateUrl('/administration/residences/').then(value => {
                    //         console.log(value)
                    //         window.history.back()
                    //     }
                    // )
                    console.log('Registered residence', residence)
                    window.history.back()
                }
                if (error) {
                    console.log('dialog - error', error)
                    if (error.field === 'doorNumber') {
                        setDoorNumberServerError(error.message)
                    } else {
                        setMessage(error.message)
                    }
                }
            }
            ,
            (error) => {
                console.log('error', error);
                console.log('error.message', error.message);
                console.log('error.response', error.response);
                console.log('error.response.data', error.response?.data);
                console.log('error.response.data.message', error.response?.data?.message);
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
    }

    const handleCancel = () => {
        window.history.back()
    }

    const formik = useFormik({
        initialValues: initialValues.current,
        validationSchema: validationSchema,
        onSubmit: handleSaveResidence
    });

    return (
        <div className="p-2">
            <div className="flex-row">
                <div className="text-2xl">{id ? 'Edit' : 'Create'}</div>
                <div className="text-xl">{initialValues.current.doorNumber} in {colony.name}</div>
            </div>
            <form onSubmit={formik.handleSubmit}>
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
                    <TextFieldFormikMui formik={formik} name="doorNumber" label="Door number"/>
                    <div className="text-red-400">{doorNumberServerError}</div>
                    <MultiSelectFormikMui name="tags"
                                          label="Tags"
                                          options={residenceTags?.map((tag) => tag.name) || []}
                                          formik={formik}/>
                    <div className="flex place-content-between gap-2">
                        <Button type="button" color="warning" variant="outlined" disabled={loading} onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" variant="outlined" disabled={loading}>
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

export default ResidenceManagementDialog;
