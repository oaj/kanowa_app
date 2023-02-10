import "./UserManagementDetail.css"
import {getUserById} from "@/lib/prisma/users";
import moment from "moment";
import Link from "next/link";
import BackButton from "@/components/common/buttons/BackButton";

const UserDetail = async ({params}: { params: { userId: number } }) => {

    const id = params.userId

    console.log('id', id)
    const {user} = await getUserById(id)
    console.log('user', user)

    return (
        user && (
            <div>
                <div className="info-panel">
                    <div className="content-box">
                        <div className="flex-row">
                            <div className="big-text spacer">{user.firstname + " " + user?.lastname}</div>
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
                        </div>
                    </div>
                </div>

                <div className="action-panel">
                    <BackButton/>
                    <Link href={"/administration/users/edit/" + id} className="btn btn-outline-light">Edit</Link>
                </div>
            </div>
        )
    )
}
export default UserDetail