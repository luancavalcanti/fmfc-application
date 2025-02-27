import CreateTable from "../components/CreateTable"
import useGetData from "../hooks/useGetData"

export default function UserPermissions() {
    const collectionName = 'userPermissions'
    const { data } = useGetData(collectionName)

    const roleList = ["user", "admin", "new"]
    const userPermissionsDefaultValues = {
        email: "",
        role: ""
    }
    const userPermissionsFields = [
        {
            label: "Email",
            type: "email",
            name: "email",
        },
        {
            label: "Role",
            type: "select",
            list: roleList,
            name: "role",
        },
    ]
    return (
        <div>
            <CreateTable
                data={data}
                tableValues={userPermissionsDefaultValues}
                defaultValues={userPermissionsDefaultValues}
                name="User Permissions"
                collectionName={collectionName}
                fields={userPermissionsFields}
            />
        </div>
    )
}
