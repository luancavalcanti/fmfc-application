import { createContext } from "react";
import useGetData from "../hooks/useGetData";

export const ComplaintsContext = createContext()
export function ComplaintsProvider({ children }) {
    const collectionName = 'complaints'
    const { data } = useGetData(collectionName)
    const { data: contracts } = useGetData('contracts')
    const getCurrentDate = () => { const today = new Date(); return today.toISOString().split("T")[0]; };
    const { data: status } = useGetData('status')
    const sortedData = status.sort((a, b) => Number(a.order) - Number(b.order)).map(status => status.name)
    const clientList = [...new Set(contracts.map(contract => contract.client))]
    function getDependence(selected) {
        const contractsByClients = contracts.filter(contract => contract.client === selected)
        const services = contractsByClients.map(contract => contract.service)
        return services
    }

    const defaultValues = {
        client: "",
        service: "",
        complaint: "",
        images: [],
        date_in: getCurrentDate(),
        status: "New"
    }

    const tableValues = {
        client: "",
        service: "",
        complaint: "",
        images: [],
        // date_in: getCurrentDate(),
        status: "New"
    }

    const fields = [
        {
            label: "Client",
            type: "select",
            list: clientList,
            name: "client",
            dependence: true,
        },
        {
            label: "Service (select a client first)",
            type: "select",
            list: [],
            name: "service",
        },
        {
            label: "Complaint",
            type: "textarea",
            rows: "5",
            cols: "5",
            name: "complaint",
        },
        {
            label: "Image(s)",
            type: "file",
            name: "images",
        },
        {
            label: "Date in",
            type: "date",
            name: "date_in",
            hidden: true
        },
        {
            label: "Status",
            type: "select",
            list: sortedData,
            name: "status",
            hidden: true
        },
    ]

    return (
        <ComplaintsContext.Provider value={{
            data,
            defaultValues,
            tableValues,
            fields,
            collectionName,
            getDependence
        }}>
            {children}
        </ComplaintsContext.Provider>
    )
}
