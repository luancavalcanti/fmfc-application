import { useContext } from "react"
import { UserContext } from "../contex/userContex"
import Employees from "./Employees"
import Clients from "./Clients"
import FormInput from "../components/FormInput"

export default function Login(){
    const { signIn, login, logout, email, setEmail, senha, setSenha, user } = useContext(UserContext)
    return(
        user?.email
            ? ( 
                <>
                    <h2>{user.email}</h2>
                    <button onClick={logout}>Logout</button>
                    <Employees/>
                    <Clients/>
                </>
              )
            : (
              <>
                    <FormInput
                        label="E-mail"
                        type="email"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <FormInput
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