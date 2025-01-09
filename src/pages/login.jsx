import { useContext } from "react"
import { UserContext } from "../contex/userContex"
import Home from "./home"

export default function Login(){
    const { signIn, login, logout, email, setEmail, senha, setSenha, user } = useContext(UserContext)
    return(
        user?.email
            ? ( 
                <>
                    <h2>{user.email}</h2>
                    <button onClick={logout}>Logout</button>
                    <Home/>
                </>
              )
            : (
              <>
                  <label>E-mail</label>
                  <input type="email" name='email' onChange={e => setEmail(e.target.value)} value={email}/>
                  <label>Senha</label>
                  <input type="text" name='senha' onChange={e => setSenha(e.target.value)} value={senha}/>
                
                  <button onClick={login}>Login</button>
                  <button onClick={signIn}>Cadastrar usuario</button>
    
              </>
            )  
          
    )
}