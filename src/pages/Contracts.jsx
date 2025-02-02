import useGetData from "../hooks/useGetData"

export default function Contracts() {
    const { data: clients } = useGetData('clients')
    const { data: services } = useGetData('services')
    const { data: employees } = useGetData('employees')

    const clientsList = (clients?.map(client => client.name))
    const servicesList = (services?.map(service => service.desc))
    const employeesList = employees?.map(employee => ([`${employee.name} ${employee.lastname}`]));
    const employeesListValues = employees?.map(employee => ([employee.id]));
    const formDefault = {
        client: "",
        service: "",
        frequency: "",
        employeesID: [],
    }
    const formObject = [
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
            type: "select",
            list: employeesList,
            listValues: employeesListValues,
            name: "employeesID",
            add: true,
        },
    ]
    return (
        <>

        </>
        // <DefaultCRUD
        //     collectionName="contracts"
        //     formDefault={formDefault}
        //     formObject={formObject}
        //     title="Contracts"
        // />
    )
}