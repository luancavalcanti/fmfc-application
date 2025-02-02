import CreateTable from "../components/CreateTable"

export default function UserPermissions() {
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

    const formProps = {
        fields: userPermissionsFields,
        defaultValues: userPermissionsDefaultValues,
        collectionName: "userPermissions"
    }
    return (
        <div>
            <CreateTable {...formProps} />
        </div>
    )
}
