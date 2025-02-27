import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import MenuClients from "./MenuClients"
import Dashboard from "../components/Dashboard"

export default function Home() {
    const { user, role, userName } = useContext(UserContext)
    const navigate = useNavigate()
    return (
        user
            ? (
                <>
                    {role === 'new' && <p>You need permissions to access this page.</p>}
                    {role === 'user' && (<MenuClients employeeUser={userName} />)}
                    {role === 'admin' && (
                        <>
                            <Dashboard />
                        </>
                    )}
                </>
            )
            : (
                <>
                    <p>You need permissions to access this page.</p>
                    <button onClick={() => navigate('/login')}>Login</button>
                </>
            )
    )
}