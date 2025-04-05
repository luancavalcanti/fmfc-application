import { createContext } from "react";
import useGetData from "../hooks/useGetData";

export const StatusContext = createContext()

export function StatusProvider({ children }) {
    const collectionName = 'status'
    const { data: status } = useGetData(collectionName)
    const data = status.sort((a, b) => Number(a.order) - Number(b.order))

    const defaultValues = {
        order: "",
        name: "",
        desc: "",
        color: "#000000",
    }
    const tableValues = {
        order: "",
        name: "",
        desc: "",
        color: "#000000",
    }
    const fields = [
        {
            label: "Order",
            type: "text",
            name: "order",
        },
        {
            label: "Name",
            type: "text",
            name: "name",
        },
        {
            label: "Description",
            type: "textarea",
            name: "desc",
        },
        {
            label: "Color",
            type: "color",
            name: "color",
        },
    ];
    return (
        <StatusContext.Provider value={{
            data,
            defaultValues,
            tableValues,
            fields
        }}>
            {children}
        </StatusContext.Provider>
    )
}