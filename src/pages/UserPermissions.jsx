import CreateForm from "../components/CreateForm"
import CreateTable from "../components/CreateTable"
import CreateUpdate from "../components/CreateUpdate"
import useGetData from "../hooks/useGetData"
import useShowController from "../hooks/useShowController"

export default function UserPermissions() {
    const collectionName = 'userPermissions'
    const { data, getData } = useGetData(collectionName)
    const { viewUpdate, showEdit, showForm, setShowForm, id } = useShowController()
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
            {showForm && <CreateForm
                collectionName={collectionName}
                defaultValues={userPermissionsDefaultValues}
                fields={userPermissionsFields}
                onCreate={getData}
                viewUpdate={viewUpdate}
            />}
            <CreateTable
                data={data}
                defaultValues={userPermissionsDefaultValues}
                viewUpdate={viewUpdate}
                id={id}
                setShowForm={setShowForm}
                showForm={showForm}
                name="User Permissions"
            />
            {showEdit &&
                <CreateUpdate
                    id={id}
                    viewUpdate={viewUpdate}
                    collectionName={collectionName}
                    fields={userPermissionsFields}
                    onUpdate={getData}
                />
            }

        </div>
    )
}
