import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import MenuClients from "./MenuClients"
import Dashboard from "../components/Dashboard"
import { BreadcrumbContext } from "../context/BreadcrumbContext"

export default function Home() {
    const { role } = useContext(UserContext)
    const { setCrumbs } = useContext(BreadcrumbContext)

    useEffect(() => {
        setCrumbs([])
    }, [setCrumbs])

    return (
        <>
            {role === 'new' && <p>You need permissions to access this page.</p>}
            {role === 'user' && (<MenuClients />)}
            {role === 'admin' && (
                <>
                    <Dashboard />
                </>
            )}

        </>
    )

}