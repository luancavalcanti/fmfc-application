import { createContext } from "react";
import useGetData from "../hooks/useGetData";

export const UserPermissionsContext = createContext();

export function UserPermissionsProvider({ children }) {
    const collectionName = 'userPermissions'
    const { data } = useGetData(collectionName)

    const roleList = ["user", "admin", "new"]
    const defaultValues = {
        email: "",
        role: ""
    }
    const tableValues = {
        email: "",
        role: ""
    }
    const fields = [
        {
            label: "Email",
            type: "email",
            name: "email",
        },
        {
            label: "Role",
            type: "select",
            list: roleList,
            name: "role",
        },
    ]
    return (
        <UserPermissionsContext.Provider value={{
            data,
            defaultValues,
            tableValues,
            fields,
            collectionName,
        }}>
            {children}
        </UserPermissionsContext.Provider>
    )
}