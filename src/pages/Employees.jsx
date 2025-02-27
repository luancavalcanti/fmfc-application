import CreateTable from "../components/CreateTable";
import useGetData from "../hooks/useGetData";

export default function Employees() {
    const getCurrentDate = () => { const today = new Date(); return today.toISOString().split("T")[0]; };
    const collectionName = 'employees'
    const { data } = useGetData(collectionName)
    const userList = data.map(user => user.email)

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
    const employeesTableValues = {
        // uid: "",
        name: "",
        lastname: "",
        email: "",
        phone: "",
        // language: "",
        // dob: "",
        // dateIn: getCurrentDate()
    }
    const employeesFields = [
        {
            label: "User",
            type: "select",
            list: userList,
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
            <CreateTable
                data={data}
                tableValues={employeesTableValues}
                defaultValues={employeesDefaultValues}
                name="Employees"
                collectionName={collectionName}
                fields={employeesFields}
            />
        </div>
    )
}