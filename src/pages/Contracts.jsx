import SelectInput from "../components/SelectInput"
import useCRUD from "../hooks/useCRUD"

export default function Contracts() {
    const frequencies = ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Quarterly', 'Semiannually', 'Annually']
    const employeesList = useCRUD('employees')
    const clientList = useCRUD('clients')
    const serviceList = useCRUD('services')
    return (
        <>
            <h1>Contracts</h1>
            <div>
                <SelectInput
                    label="Employee"
                    list={employeesList.data.map(employee => employee.name + " " + employee.lastname)}
                />
            </div>
            <div>
                <SelectInput
                    label="Clients"
                    list={clientList.data.map(client => client.name)}
                />
            </div>
            <div>
                <SelectInput
                    label="Services"
                    list={serviceList.data.map(service => service.desc)}
                />
            </div>
            <div>
                <SelectInput
                    label="Frequency"
                    list={frequencies}
                />
            </div>
        </>
    )
}