// import {useEffect, useRef, useState} from "react";
// import {Formik, Field, Form, ErrorMessage} from "formik";
// import * as Yup from "yup";

import "./UserManagementDialog.css"
import {RoleTypes} from "@/types/user.type";
import {Role, User} from "@prisma/client";
import UserEdit from "./UserEdit";
import {getUserById} from "@/lib/prisma/users";
// import {getUserById, saveManagedUser} from "@/services/user.service";

const UserCredit = async ({params}: { params: { userId: number } }) => {

    const id = params.userId
    console.log('UserCredit.params.userId', params.userId)

    const {user, error} = await getUserById(id)

    if (error) return <div>error.message</div>

    console.log('user:', user)
    return (
        user && (
            <UserEdit user={user}/>
        ));
};
export default UserCredit;
