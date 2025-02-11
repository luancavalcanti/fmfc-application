import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import MenuAdmin from "./MenuAdmin"
import MenuUser from "./MenuUser"

export default function Home() {
    const { user, role } = useContext(UserContext)
    const navigate = useNavigate()

    return (
        user
            ? (
                <>
                    <h1>Home</h1>
                    {role === 'new' && <p>You need permissions to access this page.</p>}
                    {role === 'user' && (<MenuUser userEmail={user.email} />)}
                    {role === 'admin' && (<MenuAdmin />)}
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