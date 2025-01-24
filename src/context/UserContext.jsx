/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import useCRUD from "../hooks/useCRUD";

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [user, setUser] = useState({})
  const { data } = useCRUD('userPermissions')
  const [role, setRole] = useState(localStorage.getItem('userRole') || '')
  const userFiltered = (data.filter(data => data.uid === user.uid)[0])
  //verificar se existe um usuário logando quando a página for carregada pela primeira vez
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user)
      if (userFiltered) {
        setRole(userFiltered.role)
        localStorage.setItem('userRole', userFiltered.role); // Armazena o role no localStorage
      }
    })
  }, [email])

  function signIn(e) {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        setUser(userCredential.user)
        const userPerms = ({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          role: "new"
        })
        addDoc(collection(db, 'userPermissions'), userPerms)
        // updateProfile(user, {
        //   displayName: displayName
        // });
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

  function login(e) {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
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

  function logout() {
    signOut(auth)
      .then(() => {
        console.log('Usuário deslogado')
        setUser({})
        setEmail('')
        setSenha('')
        setRole('')
        localStorage.removeItem('userRole');
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <UserContext.Provider value={{
      signIn,
      login,
      logout,
      email, setEmail,
      senha, setSenha,
      user, setUser,
      role,
      // displayName, setDisplayName
    }}>
      {children}
    </UserContext.Provider>
  )
}