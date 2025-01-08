import { useEffect, useState } from 'react'
import './App.css'
import { auth } from './firebase-config'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

function App() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [user, setUser] = useState({})

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user)
      }
    })
  },[])

  function signIn(e){
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        setUser(userCredential.user)
        setEmail('')
        setSenha('')
      })
      .catch((error) => {
        console.log(error.code)
        switch (error.code) {
          case "auth/email-already-in-use":
            alert('usuário já cadastrado')
            break;
        
          default:
            break;
        }
      })
  }

  function login(e){
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log(userCredential.user)
        setUser(auth.currentUser)
        setEmail('')
        setSenha('')
      })
      .catch((error) => {
        console.log(error.code)
        switch (error.code) {
          case 'auth/invalid-credential':
            alert('Usuário não encontrado')
            break;
        
          default:
            break;
        }
      })
  }

  function logout(){
    signOut(auth)
      .then(()=>{
        console.log('Usuário deslogado')
        setUser({})
        setEmail('')
        setSenha('')
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  return (
    <>
      {user.email
        ? ( 
            <>
              <h2>{user.email}</h2>
              <button onClick={logout}>Logout</button>
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
      }
     
      
    </>
  )
}

export default App
