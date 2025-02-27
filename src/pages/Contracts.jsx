import useGetData from "../hooks/useGetData"
import CreateTable from "../components/CreateTable"

export default function Contracts() {
    const collectionName = 'contracts'
    const { data: clients } = useGetData('clients')
    const { data: services } = useGetData('services')
    const { data: employees } = useGetData('employees')
    const { data } = useGetData(collectionName)

    const clientsList = (clients?.map(client => client.name))
    const servicesList = (services?.map(service => service.desc))
    const employeesList = employees?.map(employee => ([`${employee.name} ${employee.lastname}`]));

    const contractsDefaultValues = {
        client: "",
        service: "",
        frequency: "",
        employees: [],
    }
    const contractsTableValues = {
        client: "",
        service: "",
        frequency: "",
        employees: [],
    }
    const contractFields = [
        {
            label: "Client",
            type: "select",
            list: clientsList,
            name: "client",
        },
        {
            label: "Service",
            type: "select",
            list: servicesList,
            name: "service",
        },
        {
            label: "Frequency",
            type: "select",
            list: ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Quarterly', 'Semiannually', 'Annually'],
            name: "frequency",
        },
        {
            label: "Employees",
            type: "multipleSelect",
            list: employeesList,
            name: "employees",
        },
    ]
    return (
        <>
            <CreateTable
                data={data}
                tableValues={contractsTableValues}
                defaultValues={contractsDefaultValues}
                name="Contracts"
                collectionName={collectionName}
                fields={contractFields}
            />
        </>
    )
}