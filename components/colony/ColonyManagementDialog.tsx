"use client"
import {useEffect, useRef, useState} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";

import "./ColonyManagementDialog.css"
import {IUser} from "@/types/user.type";
import {ColonyPlus, ColonyWebTypes} from "@/types/colony.type";
import {saveColony} from "@/services/colony.service";
import {ContactWizard} from "../common/ContactWizard";
import {Button} from "@mui/material";

export const revalidate = 1

const ColonyManagementDialog = ({colony}: {colony: ColonyPlus} ) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const id = colony?.id

  const emptyUser: IUser = {
    id: null,
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
  };
  const [president, setPresident] = useState(colony.president as IUser);
  const [treasurer, setTreasurer] = useState(colony.treasurer as IUser);
  const [secretary, setSecretary] = useState(colony.secretary as IUser);

  // const [president, setPresident] = useState(emptyUser);
  // const [treasurer, setTreasurer] = useState(emptyUser);
  // const [secretary, setSecretary] = useState(emptyUser);

  const initialValues = useRef({
    name: colony.name,
    active: colony.active,
    type: colony.type,
  });

  // useEffect(() => {
  //   if (colony.president) setPresident(colony.president as IUser);
  //   if (colony.treasurer) setTreasurer(colony.treasurer as IUser);
  //   if (colony.secretary) setSecretary(colony.secretary as IUser);
  // }, [])

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Must be 5 to 50 characters')
      .max(50, 'Must be 5 to 50 characters')
      .required("This field is required!"),
    type: Yup.string().required("This field is required!")
  });

  const handleSaveColony = (formValue: { name: string, active: boolean, type: string }) => {
    const {name, active, type} = formValue;

    setMessage("");

    console.log("name", name);
    console.log("active", active);
    console.log("type", type);
    console.log("president", president);
    console.log("treasurer", treasurer);
    console.log("secretary", secretary);

    setLoading(true);

    saveColony(id, name, active, type, president, treasurer, secretary).then(
      () => {
        setTimeout(function () {
          window.history.back();
        }, 2000);
        // todo hack, ellers når prisma ikke, at opdatere før listen af usere hentes på næste side ??
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
    <div className="col-xl-12">
      <div className="card card-container">
        <div className="flex-row">
          <div className="xx-large-text">{id ? "Edit" : "Create"}</div>
          <div className="x-large-text">{initialValues.current.name}</div>
        </div>
        <Formik
          // enableReinitialize
          initialValues={initialValues.current}
          validationSchema={validationSchema}
          onSubmit={handleSaveColony}
        >
          <Form>
            <div className="form-group">
              <div className="flex-column">
                <ContactWizard fieldName="President" user={president}
                               scopeUsers={[treasurer, secretary]} emailRequired={true} setUser={setPresident}/>
                <ContactWizard fieldName="Treasurer" user={treasurer}
                               scopeUsers={[president, secretary]} emailRequired={true} setUser={setTreasurer}/>
                <ContactWizard fieldName="Secretary" user={secretary}
                               scopeUsers={[president, treasurer]} emailRequired={true} setUser={setSecretary}/>
              </div>
              <label htmlFor="name">Colony name</label>
              <Field name="name" type="text" className="form-control"/>
              <ErrorMessage
                name="name"
                component="div"
                className="alert alert-danger"
              />
            </div>
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
            <div className="vert-space2"/>
            <div className="form-group">
              <div className="flex-row">
                <Button type="button" color="warning" disabled={loading} onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"/>
                  )}
                  {id ? "Save" : "Create"}
                </Button>
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

export default ColonyManagementDialog;
