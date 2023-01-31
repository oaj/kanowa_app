import {MdArrowBackIos} from "react-icons/md";
import Link from "next/link";

const EditButton = ({userId}:{userId: number}) => {
    const handleEdit = () => {
        window.history.back();
    }
    return (
        <Link href={"../edit/" + userId} className="btn btn-outline-light"><MdArrowBackIos className="larger"/>Edit</Link>
    )

}
export default EditButton