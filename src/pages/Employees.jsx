import DefaultCRUD from "../components/DefaultCRUD"
import { CRUDProvider } from "../context/CURDContext";

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
        <CRUDProvider collectionName="employees" formDefault={formDefaultEmployees}>
            <DefaultCRUD
                title="Employees"
                formObject={formObject}
            />
        </CRUDProvider>
    )
}