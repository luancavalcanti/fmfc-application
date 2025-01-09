/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";

export const UserContext = createContext()

export function UserProvider({ children }){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [user, setUser] = useState({})

    //verificar se existe um usuário logando quando a página for carregada pela primeira vez
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
    return(
        <UserContext.Provider value={{
            signIn,
            login,
            logout,
            email, setEmail,
            senha, setSenha,
            user, setUser,
        }}>
            {children}
        </UserContext.Provider>
    )
}