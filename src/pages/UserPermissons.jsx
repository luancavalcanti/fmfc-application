import DefaultCRUD from "../components/DefaultCRUD"

export default function UserPermissions() {
    const role = ["user", "admin", "new"]
    // console.log(Object.keys(role))
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
            list: role,
            name: "role",
        },
    ]
    return (
        <DefaultCRUD
            title="User Permissions"
            collectionName="userPermissions"
            formObject={formObject}
            formDefault={formDefaultEmployees}
        />
    )
}
