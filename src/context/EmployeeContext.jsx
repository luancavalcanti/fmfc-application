import { createContext } from "react";
import useGetData from "../hooks/useGetData";

export const EmployeeContext = createContext()

export function EmployeeProvider({ children }) {
    const getCurrentDate = () => { const today = new Date(); return today.toISOString().split("T")[0]; };
    const collectionName = 'employees'
    const { data } = useGetData(collectionName)
    const userList = data.map(user => user.email)

    const defaultValues = {
        // uid: "",
        name: "",
        lastname: "",
        email: "",
        phone: "",
        language: "",
        dob: "",
        dateIn: getCurrentDate()
    }
    const tableValues = {
        // uid: "",
        name: "",
        lastname: "",
        email: "",
        phone: "",
        // language: "",
        // dob: "",
        // dateIn: getCurrentDate()
    }
    const fields = [
        {
            label: "User",
            type: "select",
            list: userList,
            name: "uid",
        },
        {
            label: "Name",
            type: "text",
            name: "name",
        },
        {
            label: "Last Name",
            type: "text",
            name: "lastname",
        },
        {
            label: "E-mail",
            type: "email",
            name: "email",
        },
        {
            label: "Phone",
            type: "tel",
            name: "phone",
        },
        {
            label: "Language",
            type: "text",
            name: "language",
        },
        {
            label: "DoB",
            type: "date",
            name: "dob",
        },
        {
            label: "Date In",
            type: "date",
            name: "dateIn",
        },
    ]

    return (
        <EmployeeContext.Provider value={{
            data,
            defaultValues,
            tableValues,
            fields,
            collectionName,
        }}>
            {children}
        </EmployeeContext.Provider>
    )
}