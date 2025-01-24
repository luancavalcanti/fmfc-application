import DefaultCRUD from "../components/DefaultCRUD"
import useCRUD from "../hooks/useCRUD";

export default function Employees() {
    const getCurrentDate = () => { const today = new Date(); return today.toISOString().split("T")[0]; };
    const users = useCRUD('userPermissions')
    const userValues = users.data.map(user => ({ [user.email]: user.uid }))
    const formDefaultEmployees = {
        uid: "",
        name: "",
        lastname: "",
        email: "",
        phone: "",
        language: "",
        dob: "",
        dateIn: getCurrentDate()
    }
    const formObject = [
        {
            label: "User",
            type: "select",
            list: userValues,
            name: "uid",
        },
        {
            label: "Name",
            type: "text",
            name: "name",
        },
        {
            label: "Lastname",
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
        <DefaultCRUD
            title="Employees"
            collectionName="employees"
            formObject={formObject}
            formDefault={formDefaultEmployees}
        />
    )
}