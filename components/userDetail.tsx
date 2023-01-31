"use client"
import {useEffect, useState} from "react";
import moment from "moment";
import {MdArrowBackIos} from "react-icons/md";
import "../app/administration/users/detail/[userId]/UserManagementDetail.css"
import {getUserById} from "../../../services/user.service";
import {setUserBlocked} from "../../../services/command.service";
import {User} from "@prisma/client";
import { useRouter } from 'next/router'

export const UserDetail = ({ params }: { params: { id: number }}) => {

    const id = params.id

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState("");

    // const router = useRouter()
    // const { id } = router.query

    const handleBack = () => {
        window.history.back();
    }

    useEffect(() => {
        id && getUserById(id).then((response) => {
            setUser(response.data)
        });
    }, [id]);

    if (!id) {
        setError("Id not defined.")
        return (
            <div>
                <div>Id not defined.</div>
                <div>
                    <button className="btn btn-outline-dark" onClick={handleBack}>Back</button>
                </div>
            </div>
        )
    }

    // const handleDelete = () => {
    //   setIsDialogOpen(true);
    // }

    // const handleClose = () => {
    //   setIsDialogOpen(false);
    // }

    // const handleConfirmDelete = () => {
    //   deleteUser(id).then((response) => {
    //     console.log('response', response)
    //     window.history.back()
    //   }).catch(reason => {
    //     console.log('reason', reason)
    //     setError(reason.message)
    //   })
    //   setIsDialogOpen(false);
    // }
    const setBlocked = () => {
        if (user?.id) {
            setUserBlocked(user.id, !user?.blocked).then(user => {
                setUser(user);
            });
        }
    }

    return (

        <div>
            <div className="info-panel">
                <div className="content-box">
                    <div className="flex-row">
                        <div className="big-text spacer">{user?.firstname + " " + user?.lastname}</div>
                        <link href={"edit/" + id}  className="btn btn-outline-primary" >Edit</link>
                    </div>
                    <div className="detail-section">
                        <div>
                            <div className="label">Email:</div>
                            <div className="value">{user?.email}</div>
                            <div className="label">Phone:</div>
                            <div className="value">{user?.phone}</div>
                        </div>
                        <div className="detail-flex-row">
                            <div className="spacer">
                                <span className="label">Activated: </span>
                                <span className={user?.active ? "green" : "red"}>
                {user?.active ? "Yes" : "No"}
              </span>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="detail-row-lbl-val">
                            <div className="label">Created Date</div>
                            <div>{moment(user?.createdAt).isValid() ? moment(user?.createdAt).fromNow() : "-- none --"}</div>
                        </div>
                        <div className="detail-row-lbl-val">
                            <div className="label">Last Updated Date</div>
                            <div>{moment(user?.updatedAt).isValid() ? moment(user?.updatedAt).fromNow() : "-- none --"}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="info-panel">
                <div className="content-box">
                    <div className="detail-flex-row">
                        <div className="spacer">
                            <span className="label">Blocked: </span>
                            <span className={user?.blocked ? "red" : "green"}>
                {user?.blocked ? "Yes" : "No"}
              </span>
                        </div>
                        <button className="btn btn-outline-dark" onClick={setBlocked}>
                            {user?.blocked ? "Unblock" : "Block"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="action-panel">
                <button className="btn btn-outline-light" onClick={handleBack}><MdArrowBackIos className="larger"/>Back</button>
            </div>
        </div>
    )
}
