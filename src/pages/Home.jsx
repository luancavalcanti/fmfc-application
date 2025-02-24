import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import MenuClients from "./MenuClients"

export default function Home() {
    const { user, role } = useContext(UserContext)
    const navigate = useNavigate()

    return (
        user
            ? (
                <>
                    {/* <h1>Home</h1> */}
                    {role === 'new' && <p>You need permissions to access this page.</p>}
                    {role === 'user' && (<MenuClients />)}
                    {role === 'admin' && (
                        <>
                            <br />
                            <button onClick={() => navigate("clients")}>Client</button>
                            <button onClick={() => navigate("employee")}>Employee</button>
                            <button onClick={() => navigate("admin")}>Admin</button>
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