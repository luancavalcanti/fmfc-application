import CreateForm from "../components/CreateForm";
import CreateTable from "../components/CreateTable";
import CreateUpdate from "../components/CreateUpdate";
import useGetData from "../hooks/useGetData";
import useShowController from "../hooks/useShowController";

export default function Employees() {
    const getCurrentDate = () => { const today = new Date(); return today.toISOString().split("T")[0]; };
    const { viewUpdate, showEdit, showForm, setShowForm, id } = useShowController()
    const collectionName = 'employees'
    const { data, getData } = useGetData(collectionName)
    const userList = data.map(user => user.email)
    const userValues = data.map(user => user.uid)
    const employeesDefaultValues = {
        // uid: "",
        name: "",
        lastname: "",
        email: "",
        phone: "",
        language: "",
        dob: "",
        dateIn: getCurrentDate()
    }
    const employeesFields = [
        {
            label: "User",
            type: "select",
            list: userList,
            listValues: userValues,
            name: "uid",
        },
        {
            label: "Name",
            type: "text",
            name: "name",
        },
        {
            label: "Last Name",
            type: "text",
            name: "lastname",
        },
        {
            label: "E-mail",
            type: "email",
            name: "email",
        },
        {
            label: "Phone",
            type: "tel",
            name: "phone",
        },
        {
            label: "Language",
            type: "text",
            name: "language",
        },
        {
            label: "DoB",
            type: "date",
            name: "dob",
        },
        {
            label: "Date In",
            type: "date",
            name: "dateIn",
        },
    ]

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>New</button>
            {showForm && <CreateForm
                defaultValues={employeesDefaultValues}
                fields={employeesFields}
                collectionName={collectionName}
                data={data}
                onCreate={getData}
                viewUpdate={viewUpdate}
            />}
            <CreateTable
                defaultValues={employeesDefaultValues}
                data={data}
                viewUpdate={viewUpdate}
            />
            {showEdit &&
                <CreateUpdate
                    id={id}
                    viewUpdate={viewUpdate}
                    collectionName={collectionName}
                    fields={employeesFields}
                    onUpdate={getData}
                />
            }
        </div>
    )
}