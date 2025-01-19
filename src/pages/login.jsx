import { useContext } from "react"
import Employees from "./Employees"
import Clients from "./Clients"
import TextInput from "../components/TextInput"
import Contracts from "./Contracts"
import { UserContext } from "../context/UserContext"
import Services from "./Services"
import Comments from "./Comments"

export default function Login() {
    const { signIn, login, logout, email, setEmail, senha, setSenha, user } = useContext(UserContext)
    return (
        user?.email
            ? (
                <>
                    <h2>{user.email}</h2>
                    <button onClick={logout}>Logout</button>
                    <Employees />
                    <Clients />
                    <Services />
                    <Contracts />
                    <Comments />
                </>
            )
            : (
                <>
                    <TextInput
                        label="E-mail"
                        type="email"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <TextInput
                        label="Senha"
                        type="password"
                        name="senha"
                        onChange={e => setSenha(e.target.value)}
                        value={senha}
                    />

                    <button onClick={login}>Login</button>
                    <button onClick={signIn}>Cadastrar usuario</button>

                </>
            )

    )
}