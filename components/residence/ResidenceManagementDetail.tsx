"use client"
import {useRef, useState} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
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

export const revalidate = 1

const ResidenceManagementDetail = ({colony, residence}:
                                       {
                                           colony: IColony,
                                           residence: IResidence,
                                       }) => {


    return (
        <div>Residence {residence.doorNumber} in {colony.name}</div>
    );
};

export default ResidenceManagementDetail;
