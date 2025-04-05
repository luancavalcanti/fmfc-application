import { createContext } from "react";
import useGetData from "../hooks/useGetData";

export const ClientContext = createContext();

export function ClientProvider({ children }) {
    const collectionName = 'clients'
    const { data } = useGetData(collectionName)
    const defaultValues = {
        name: "",
        location: "",
        phone: "",
        email: "",
        responsible: "",
    }
    const tableValues = {
        name: "",
        location: "",
        phone: "",
        email: "",
        responsible: "",
    }
    const fields = [
        {
            label: "Name",
            type: "text",
            name: "name",
        },
        {
            label: "Location",
            type: "text",
            name: "location",
        },
        {
            label: "Phone",
            type: "tel",
            name: "phone",
        },
        {
            label: "E-mail",
            type: "email",
            name: "email",
        },
        {
            label: "Responsible",
            type: "text",
            name: "responsible",
        },
    ];

    return (
        <ClientContext.Provider value={{
            data,
            defaultValues,
            tableValues,
            fields,
        }}>
            {children}
        </ClientContext.Provider>
    )
}