import DefaultCRUD from "../components/DefaultCRUD"

export default function UserPermissions(role) {
    const roleList = ["user", "admin", "new"]
    const formDefaultEmployees = {
        email: "",
        role: ""
    }
    const formObject = [

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
        <DefaultCRUD
            title="User Permissions"
            collectionName="userPermissions"
            formObject={formObject}
            formDefault={formDefaultEmployees}
            role={role}
        />
    )
}
