import React, {FocusEvent, useEffect, useMemo, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, IconButton, Tooltip,
} from "@mui/material";

import {MdEmail} from "react-icons/md";
import {MdPhoneAndroid} from "react-icons/md";
import {MdHighlightOff} from "react-icons/md";
import {MdArrowBackIos} from "react-icons/md";
import {MdArrowForwardIos} from "react-icons/md";
import {MdEdit} from "react-icons/md";

import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import * as Yup from "yup";
import {getUserByEmail} from "@/services/user.service";
import {IUser} from "@/types/user.type";
import TextFieldFormikMui from "@/components/common/formik.mui/TextField";
// import "./ContactWizard.css"

type ContactState = {
    nameRequired: boolean,
    contactDone: boolean,
}
type IUserState = {
    pageName: string,
    emailRequired: boolean
}
// pageName is part of dialogUser because Yup needs it to conditionally validate.
// It needs to conditionally validate because it is a multi page form and hidden required fields
// with errors are not visible and blocking submit.
type IDialogUser = IUser & IUserState;

const pages = {
    detailPage: "detailPage",
    emailFormPage: "emailFormPage",
    nameFormPage: "nameFormPage",
    removeWarning: "removeWarning"
};

type WizardProps = {
    fieldName: string,
    user: IUser,
    scopeUsers: IUser[],
    emailRequired: boolean,
    setUser: (value: (((prevState: IUser) => IUser) | IUser)) => void
}

export const ContactWizard = ({fieldName, user, scopeUsers, emailRequired, setUser}: WizardProps) => {
    // console.log('----------------------------------------------- render ----------------------------------------------')
    // console.log('user', user)
    // console.log('scopeUsers', scopeUsers);
    const initialContactState: ContactState = useMemo(() => {
        return {
            nameRequired: true,
            contactDone: false,
        }
    }, []);

    const emptyUser: IDialogUser = {
        id: null,
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
        role: null,
        active: true,
        createdAt: null,
        pageName: pages.emailFormPage,
        emailRequired: emailRequired
    };

    const [dialogUser, setDialogUser] = useState<IUser & IUserState>(emptyUser);
    const [contactState, setContactState] = useState<ContactState>(initialContactState);
    const [pageName, setPageName] = useState(pages.emailFormPage);
    const [pagePrevious, setPagePrevious] = useState(pages.emailFormPage);

    // Use setNextPage, not setPageName
    const setNextPage = (nextPage: string) => {
        let nextPrevPage = "";
        switch (nextPage) {
            case pages.emailFormPage:
            case pages.nameFormPage:
                nextPrevPage = pages.emailFormPage;
                break
            case pages.detailPage:
                nextPrevPage = pageName;
                break
        }
        setPagePrevious(nextPrevPage);
        setPageName(nextPage);
    }

    useEffect(() => {
        // console.log('user', user)
        const clonedUser = {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            role: null,
            active: user.active,
            createdAt: user.createdAt,
            pageName: '',
            emailRequired: emailRequired
        }
        // console.log('clonedUser', clonedUser)
        setDialogUser(clonedUser);
        setContactState(initialContactState);
        setNextPage(pages.emailFormPage);
        // console.log('useEffect-dialogUser', dialogUser)
        // eslint-disable-next-line
    }, [user, fieldName, initialContactState, pages.emailFormPage])

    useEffect(() => {
        // pageName in dialogUser must be updated.
        setDialogUser(prevDialogUser => ({...prevDialogUser, pageName: pageName}));
    }, [pageName])

    // console.log('render - after useEffect - ' + fieldName + '2: dialog user', dialogUser);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        resetDialog();
        setDialogUser({...user, emailRequired, pageName: pages.emailFormPage});
    }

    const handleClose = () => {
        // console.log('handleClose');
        setOpen(false);
        resetDialog();
    };

    // not sure
    const resetDialog = () => {
        // console.log('resetDialog');
        setNextPage(pages.emailFormPage);
        setContactState(initialContactState);
    }

    const handleDone = () => {
        // console.log('handleDone');
        if (contactState.contactDone) {
            // console.log("Contact done - setting user")
            setUser(dialogUser);
        }
        handleClose();
    }

    // MultiPage
    const lookupInScope = (email: string) => {
        // console.log("Look Up In Scope: " + email)
        return scopeUsers.find(value => value.email === email);
    }

    const lookupContactRemote: (email: string) => Promise<IUser> = async (email: string) => {
        // console.log("Look Up Remote: " + email)

        return await getUserByEmail(email).then(res => {
            // console.log('getUserByEmail - res', res)
            const iUser: IUser = {
                id: res.user.id,
                email: res.user.email,
                firstname: res.user.firstname,
                lastname: res.user.lastname,
                phone: res.user.phone,
                role: res.user.role,
                active: res.user.active,
                createdAt: res.user.createdAt,
            }
            return iUser;
        })
    }

    const handleRemove = () => {
        // console.log('handleRemove');
        setNextPage(pages.removeWarning);
        setOpen(true);
    }

    const clearContact = () => {
        // console.log("Clear contact !");
        setOpen(false);
        setDialogUser(emptyUser);
        setUser(emptyUser);
        resetDialog();
    }

    const validationSchema = Yup.object().shape({
        pageName: Yup.string(),
        emailRequired: Yup.boolean(),
        email: Yup.string()
            .when(['pageName', 'emailRequired'], {
                is: (pageName: string, emailRequired: boolean) => pageName === pages.emailFormPage && emailRequired,
                then: Yup.string().email("Must be a valid email !").required("Field is required!"),
                otherwise: Yup.string().email("Must be a valid email !")
            }),

        firstname: Yup.string()
            .when('pageName', {
                is: (val: string) => val === pages.nameFormPage,
                then: Yup.string().required("Field is required!"),
                otherwise: Yup.string()
            }),

        lastname: Yup.string()
            .when('pageName', {
                is: (val: string) => val === pages.nameFormPage,
                then: Yup.string().required("Field is required!"),
                otherwise: Yup.string()
            }),
    });

    const handlePrevious = () => {
        if (pagePrevious !== "") {
            setNextPage(pagePrevious);
        }
    }


    const handleSubmit = (formValue: { email: string, firstname: string, lastname: string }) => {
        if (!open) return;

        // console.log('handleSubmit')

        const {email, firstname, lastname} = formValue;
        // console.log("handleSubmit - form: ", email, firstname, lastname);
        // console.log('1: handleSubmit - ' + fieldName + ': dialog user', dialogUser);

        const currentPageName = pageName;
        if (currentPageName === pages.emailFormPage) {
            // console.log("submit - email page", email);

            if (email) {
                let scopeUser: IUser | undefined = lookupInScope(email);
                // console.log('scopeUser', scopeUser);
                if (scopeUser) {
                    setContactState(prevState => ({...prevState, nameRequired: false, contactDone: true}));
                    setDialogUser({...scopeUser, emailRequired: emailRequired, pageName: pages.detailPage});
                    setNextPage(pages.detailPage);
                    return;
                } else {

                    // no scope user
                    lookupContactRemote(email).then(remoteUser => {
                        // console.log('remoteUser', remoteUser)
                        setContactState(prevState => ({
                            ...prevState,
                            nameRequired: false,
                            contactDone: true,
                        }));
                        setDialogUser({...remoteUser, emailRequired: emailRequired, pageName: pages.detailPage});
                        setNextPage(pages.detailPage);
                    }).catch((err) => {
                        // no lookedUp remote user
                        setDialogUser(prevDialogUser => ({...prevDialogUser, firstname: '', lastname: '', phone: ''}));
                        setContactState(prevState => ({...prevState, nameRequired: true}));
                        setNextPage(pages.nameFormPage);
                        console.log('got Error', err);
                    });
                }
            } else {  // email blank
                setDialogUser(previousState => {
                    return {...previousState, email: email, pageName: pages.nameFormPage}
                });
                contactState.nameRequired = true;
                if (open) setNextPage(pages.nameFormPage);
            }

        } else if (currentPageName === pages.nameFormPage) {
            // console.log("submit - name page")
            setContactState(prevState => ({...prevState, contactDone: true}));
            setNextPage(pages.detailPage);
            setDialogUser(previousState => {
                return {
                    ...previousState,
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    pageName: pages.detailPage
                }
            });
        } else if (currentPageName === pages.detailPage) {
            // console.log("submit - detail page");
            handleDone();
        }
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        // console.log('Blur - ' + event.target.name, ' = ', event.target.value);
        if ('email' === event.target.name) {
            setDialogUser(previousState => {
                return {...previousState, email: event.target.value}
            });
        }
        if ('firstname' === event.target.name) {
            setDialogUser(previousState => {
                return {...previousState, firstname: event.target.value}
            });
        }
        if ('lastname' === event.target.name) {
            setDialogUser(previousState => {
                return {...previousState, lastname: event.target.value}
            });
        }
    }

    const formik = useFormik({
        initialValues: dialogUser,
        enableReinitialize: true,
        validationSchema: validationSchema,
        validateOnBlur: true,
        onSubmit: handleSubmit
    });

    return (
        <div className="border border-gray-600 hover:border-gray-200 border-solid rounded-[5px] p-2">
            <div className="flex-row">
                <div className="label spacer">{fieldName}</div>
                <div>{user.firstname + " " + user.lastname}</div>
            </div>
            <div className="flex flex-row">
                {user.phone && (
                    <Tooltip title={user.phone} placement="top-end" className="shrink">
                        <IconButton>
                            <MdPhoneAndroid className="larger"/>
                        </IconButton>
                    </Tooltip>
                )}
                {user.email && (
                    <Tooltip title={user.email} placement="top-start" className="shrink">
                        <IconButton>
                            <MdEmail className="larger"/>
                        </IconButton>
                    </Tooltip>
                )}
                <div className="grow"/>
                <Tooltip title="Remove" placement="top-start"
                         className={`flex-none larger ${user.firstname === "" ? "collapse" : "visible"}`}>
                    <IconButton onClick={handleRemove}>
                        <MdHighlightOff className="larger"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit" placement="top-end" className="shrink">
                    <IconButton onClick={handleClickOpen}>
                        <MdEdit className="larger"/>
                    </IconButton>
                </Tooltip>
            </div>

            <div>
                <Dialog open={open} fullWidth maxWidth="sm" onClose={handleClose}>
                    <DialogTitle>
                        <div><span>Edit {fieldName} {user.firstname} {user.lastname}</span></div>
                        {/*<div><span>Page: {dialogUser.pageName}</span></div>*/}
                    </DialogTitle>
                    <DialogContent>
                            <form id="form" onSubmit={formik.handleSubmit}>
                                <div className={pageName !== pages.removeWarning ? "hidden" : ""}>
                                    <div>
                                        <p>Please, to remove the contact, click the button below.</p>
                                        <div className="flex flex-row gap-2">
                                            <div className="spacer">
                                                <Button variant="outlined" color="warning" onClick={handleCancel}>
                                                    Cancel
                                                </Button>
                                            </div>
                                            <div>
                                                <Button variant="outlined" color="primary" onClick={clearContact}>
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className={pageName !== pages.detailPage ? "hidden" : ""}>
                                        <div>{dialogUser.firstname} {dialogUser.lastname}</div>
                                        <div>{dialogUser.email}</div>
                                    </div>
                                    <div className={pageName !== pages.emailFormPage ? "hidden" : "mt-2"}>
                                        <TextFieldFormikMui formik={formik} name="email" label="Email"/>
                                    </div>
                                    <div className={pageName !== pages.nameFormPage ? "hidden" : "flex flex-col gap-2 mt-2"}>
                                        <TextFieldFormikMui formik={formik} name="firstname" label="Firstname"/>
                                        <TextFieldFormikMui formik={formik} name="lastname" label="Lastname"/>
                                    </div>
                                </div>
                                <Button type="submit" className="hidden" color="primary" >Submit</Button>
                            </form>

                    </DialogContent>

                    <DialogActions className={pageName === pages.removeWarning ? "hidden" : ""}>
                        <DialogContent style={{paddingTop: "0"}}>
                            <div className="flex flex-row gap-2">
                                <Button variant="outlined" color="warning" onClick={handleCancel}>Cancel</Button>
                                <Button variant="outlined" color="primary" onClick={handleDone}
                                        sx={{display: pageName !== pages.detailPage ? 'none' : 'block'}}>Save
                                </Button>
                                <div className="rem-2-spacer"/>
                                <Button variant="outlined" color="primary"
                                        disabled={pageName !== pages.nameFormPage && pageName !== pages.detailPage}
                                        onClick={handlePrevious} type="submit">
                                    <MdArrowBackIos className="larger"/>Prev
                                </Button>
                                <Button variant="outlined" color="primary" type="submit" form="form"
                                        disabled={pageName === pages.detailPage}>
                                    Next<MdArrowForwardIos className="larger"/>
                                </Button>
                            </div>
                        </DialogContent>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};
