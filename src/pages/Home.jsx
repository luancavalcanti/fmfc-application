import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import MenuClients from "./MenuClients"
import Dashboard from "../components/Dashboard"

export default function Home() {
    const { role } = useContext(UserContext)

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