"use client"
import {MdArrowBackIos} from "react-icons/md";

const BackButton = () => {
    const handleBack = () => {
        window.history.back();
    }

    return (
        <button className="btn btn-outline-light" onClick={handleBack}><MdArrowBackIos className="larger"/>Back
    </button>

)
}
export default BackButton