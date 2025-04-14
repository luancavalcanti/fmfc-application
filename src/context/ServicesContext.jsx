import { createContext } from "react";
import useGetData from "../hooks/useGetData";

export const ServicesContext = createContext();

export function ServicesProvider({ children }) {
    const collectionName = 'services'
    const { data } = useGetData(collectionName)

    const defaultValues = {
        desc: ""
    }
    const tableValues = {
        desc: ""
    }
    const fields = [
        {
            label: "Description",
            type: "text",
            name: "desc"
        }
    ]
    return (
        <ServicesContext.Provider value={{
            data,
            defaultValues,
            tableValues,
            fields,
            collectionName,
        }}>
            {children}
        </ServicesContext.Provider>
    )
}

