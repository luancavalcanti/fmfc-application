import { useContext } from "react"
import CreateTable from "../components/CreateTable"
import { UserPermissionsContext } from "../context/UserPermissionsContext"

export default function UserPermissions() {
    const userPermissionsContext = useContext(UserPermissionsContext)
    return (
        <div>
            <CreateTable
                context={userPermissionsContext}
                name="User Permissions"
            />
        </div>
    )
}
