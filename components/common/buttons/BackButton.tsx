"use client"
import {MdArrowBackIos} from "react-icons/md";
import {Button} from "@mui/material";

const BackButton = () => {
    const handleBack = () => {
        window.history.back();
    }

    return (
        <Button onClick={handleBack} className="">
            <MdArrowBackIos className="f larger"/>
            Back
        </Button>

    )
}
export default BackButton