import { createContext } from "react"
import useGetData from "../hooks/useGetData"

export const ContractContext = createContext()
export function ContractProvider({ children }) {
    const collectionName = 'contracts'
    const { data: clients } = useGetData('clients')
    const { data: services } = useGetData('services')
    const { data: employees } = useGetData('employees')
    const { data } = useGetData(collectionName)

    const clientsList = (clients?.map(client => client.name))
    const servicesList = (services?.map(service => service.desc))
    const employeesList = employees?.map(employee => ([`${employee.name} ${employee.lastname}`]));

    const defaultValues = {
        client: "",
        service: "",
        frequency: "",
        employees: [],
    }
    const tableValues = {
        client: "",
        service: "",
        frequency: "",
        employees: [],
    }
    const fields = [
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
        <ContractContext.Provider value={{
            data,
            defaultValues,
            tableValues,
            fields,
            collectionName
        }}>
            {children}
        </ContractContext.Provider>
    )
}