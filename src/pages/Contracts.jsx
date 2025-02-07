import useGetData from "../hooks/useGetData"
import CreateTable from "../components/CreateTable"
import CreateForm from "../components/CreateForm"
import CreateUpdate from "../components/CreateUpdate"
import useShowController from "../hooks/useShowController"

export default function Contracts() {
    const { data: clients } = useGetData('clients')
    const { data: services } = useGetData('services')
    const { data: employees } = useGetData('employees')
    const { data, getData } = useGetData('contracts')
    const { viewUpdate, showEdit, showForm, setShowForm, id } = useShowController()

    const clientsList = (clients?.map(client => client.name))
    const servicesList = (services?.map(service => service.desc))
    const employeesList = employees?.map(employee => ([`${employee.name} ${employee.lastname}`]));

    const contractsDefaultValues = {
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
            type: "select",
            list: employeesList,
            name: "employees",
            add: true,
        },
    ]
    return (
        <>
            <br />
            <br />
            <button onClick={() => setShowForm(!showForm)}>New</button>
            {showForm && <CreateForm
                defaultValues={contractsDefaultValues}
                fields={contractFields}
                collectionName={'contracts'}
                data={data}
                onCreate={getData}
                viewUpdate={viewUpdate}
            />}
            <CreateTable
                defaultValues={contractsDefaultValues}
                data={data}
                viewUpdate={viewUpdate}
            />
            {showEdit &&
                <CreateUpdate
                    id={id}
                    viewUpdate={viewUpdate}
                    collectionName={'contracts'}
                    fields={contractFields}
                    onUpdate={getData}
                />
            }
        </>
    )
}