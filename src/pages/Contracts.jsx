import DefaultCRUD from "../components/DefaultCRUD"
import { CRUDProvider } from "../context/CURDContext"

export default function Contracts() {
    const formDefaultContracts = {
        client: "",
        frequency: "",
        service: "",
        employees: '',
    }
    const formObject = [
        {
            label: "Client",
            type: "text",
            name: "client"
        },
        {
            label: "Frequency",
            type: "text",
            name: "frequency"
        },
        {
            label: "Service",
            type: "text",
            name: "service"
        },
        {
            label: "Employee(s)",
            type: "text",
            name: "employees"
        },
    ]
    return (

        <CRUDProvider collectionName="contracts" formDefault={formDefaultContracts}>
            <DefaultCRUD
                title="Contracts"
                formObject={formObject}
            />
        </CRUDProvider>

    )
}