import { createContext, useState } from "react";

export const BreadcrumbContext = createContext()

export function BreadcrumbProvider({ children }) {
    const [crumbs, setCrumbs] = useState([])

    return (
        <BreadcrumbContext.Provider value={{ crumbs, setCrumbs }}>
            {children}
        </BreadcrumbContext.Provider>
    )
}