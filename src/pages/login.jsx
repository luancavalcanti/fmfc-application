import { useContext } from "react"
import TextField from "../components/TextField"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const { signIn, login, email, setEmail, password, setPassword } = useContext(UserContext)
    const navigate = useNavigate()
    function handleLogin() {
        login()
        navigate('/home')
    }
    return (
        <>
            <div>
                <TextField
                    label="E-mail"
                    type="email"
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div>
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <br />
            <div>
                <button onClick={handleLogin}>Login</button>
                <button onClick={signIn}>Register user</button>
            </div>
        </>
    )

}