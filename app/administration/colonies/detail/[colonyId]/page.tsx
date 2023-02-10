import moment from "moment";
import "./ColonyManagementDetail.css"
import {getColonyById} from "@/lib/prisma/colonies";
import Link from "next/link";
import {ColonyPlus, ColonyWebTypes} from "@/types/colony.type";
import BackButton from "@/components/common/buttons/BackButton";

export const revalidate = 1

const ColonyDetail = async ({params}: { params: { colonyId: number } }) => {

  const id = params.colonyId;
  const {colony, error} = await getColonyById(id)

  return (
colony && (
    <div>
      <div className="info-panel">
        <div className="content-box">
          <div className="flex-row">
            <div className="big-text">{colony?.name}</div>
            <div className="spacer">{colony?.type}</div>
            <Link href={"../edit/" + id} className="btn btn-outline-primary" >Edit</Link>
          </div>
          <div className="detail-section">
            <h5>Address</h5>
            <div>
              <div className="value">{colony.address}</div>
              <div className="label">Near By:</div>
              <div className="value">{colony?.nearBy}</div>
              <div className="label">City:</div>
              <div className="value">{colony?.city}</div>
            </div>
          </div>

          <div className="detail-section">
            <h5>Board</h5>
            <div className="">
              <div className="detail-row-lbl-val">
                <div className="label">President:</div>
                <div className="value">{colony.president.firstname} {colony?.president.lastname}</div>
              </div>
              <div className="detail-row-lbl-val">
                <div className="label">Treasurer:</div>
                <div className="value">{colony?.treasurer.firstname} {colony?.treasurer.lastname}</div>
              </div>
              <div className="detail-row-lbl-val">
                <div className="label">Secretary:</div>
                <div className="value">{colony?.secretary.firstname} {colony?.secretary.lastname}</div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="detail-row-lbl-val">
              <div className="label">Last Modified Date</div>
              <div>{moment(colony.updatedAt).isValid() ? moment(colony.updatedAt).fromNow() : "-- none --"}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="info-panel">
        <div className="content-box">
          <div className="detail-flex-row">
            <div className="spacer">
              <span className="label">Active: </span>
              <span className={colony?.active ? "green" : "red"}>
                {colony?.active ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="info-panel">
        <div className="content-box">


          <div className="detail-flex-column">
            <div className="detail-flex-row">
              <div className="spacer">
                <span className="label">Role Notification: </span>
                <span className={colony?.roleNotificationsSuspended ? "red" : "green"}>
                {colony?.roleNotificationsSuspended ? "Suspended" : "Running"}
              </span>
              </div>
            </div>
          </div>


          <h5>{ColonyWebTypes.valueOf(colony?.type)?.label}</h5>
          <div className="detail-flex-row">
            <div className="label">{colony.residencies?.length}</div>
            <div className="value spacer">{ColonyWebTypes.valueOf(colony?.type)?.label}</div>
            <div>
              <button className="btn btn-outline-primary">Manage</button>
            </div>
          </div>
        </div>
      </div>
      <div className="action-panel">
        <BackButton/>
        <Link href={"/administration/colonies/edit/" + id} className="btn btn-outline-light">Edit</Link>
      </div>
    </div>
  ))
}
export default ColonyDetail