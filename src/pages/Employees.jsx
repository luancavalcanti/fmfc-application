import CreateTable from "../components/CreateTable";
import useGetData from "../hooks/useGetData";

export default function Employees() {
    const getCurrentDate = () => { const today = new Date(); return today.toISOString().split("T")[0]; };
    const { data } = useGetData('userPermissions')
    const userList = data.map(user => user.email)
    const userValues = data.map(user => user.uid)
    const employeesDefaultValues = {
        uid: "",
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

    const props = {
        fields: employeesFields,
        defaultValues: employeesDefaultValues,
        collectionName: 'employees'
    }

    return (
        <div>
            <CreateTable {...props} />
        </div>
    )
}