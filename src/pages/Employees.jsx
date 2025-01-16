import DefaultCRUD from "../components/DefaultCRUD"

export default function Employees() {
    const getCurrentDate = () => { const today = new Date(); return today.toISOString().split("T")[0]; };
    const formDefaultEmployees = {
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