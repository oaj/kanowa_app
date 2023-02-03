import UserManagementDialog from "@/components/user/UserManagementDialog";
import {getUserById} from "@/lib/prisma/users";

const UserEdit = async ({params}: { params: { userId: number } }) => {

    const id = params.userId
    console.log('UserCredit.params.userId', params.userId)

    const {user, error} = await getUserById(id)

    if (error) return <div>error.message</div>

    console.log('user:', user)
    return (
        user && (
            <UserManagementDialog user={user}/>
        ));
};
export default UserEdit;
