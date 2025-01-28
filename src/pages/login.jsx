import { useContext } from "react"
import Employees from "./Employees"
import Clients from "./Clients"
import TextInput from "../components/TextInput"
import Contracts from "./Contracts"
import { UserContext } from "../context/UserContext"
import Services from "./Services"
import UserPermissions from "./UserPermissons"

export default function Login() {
    const { signIn, login, logout, email, setEmail, senha, setSenha, user, role } = useContext(UserContext)
    if (user?.email) {
        switch (role) {
            case 'admin':
                return (
                    <>
                        <p>{role}</p>
                        <h2>{user.email}</h2>
                        <button onClick={logout}>Logout</button>
                        <UserPermissions />
                        <Employees role={role} />
                        <Clients role={role} />
                        <Services role={role} />
                        <Contracts uid={user.uid} role={role} />
                    </>
                )
            case 'user':
                return (
                    <>
                        <p>{role}</p>
                        <h2>{user.email}</h2>
                        <button onClick={logout}>Logout</button>
                        <Contracts uid={user.uid} role={role} />
                    </>
                )
            case 'new':
                return (
                    <>
                        <p>{role}</p>
                        <h2>{user.email}</h2>
                        <button onClick={logout}>Logout</button>
                        <h2>You need permissions</h2>
                    </>
                )
        }
    } else {
        return (
            <>
                <TextInput
                    label="E-mail"
                    type="email"
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <TextInput
                    label="Password"
                    type="password"
                    name="senha"
                    onChange={e => setSenha(e.target.value)}
                    value={senha}
                />
                <button onClick={login}>Login</button>
                <button onClick={signIn}>Register user</button>
            </>
        )
    }
}