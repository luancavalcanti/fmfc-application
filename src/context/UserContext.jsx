/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import useGetData from "../hooks/useGetData";

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({})
  const { data: userPermissions } = useGetData('userPermissions')
  const { data: employees } = useGetData('employees')
  const [role, setRole] = useState(localStorage.getItem('userRole') || '')
  const employee = employees.filter(employee => employee.email === user.email)[0]
  const userName = `${employee?.name} ${employee?.lastname}`
  const userFiltered = useMemo(() => {
    return userPermissions.find(data => data.uid === user?.uid);
  }, [userPermissions, user]);
  // //check if there is a user logging in when the page is first loaded
  // //if there is, set the user and role states
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })

  }, []);
  useEffect(() => {
    if (user && userFiltered) {
      setRole(userFiltered.role);
      localStorage.setItem('userRole', userFiltered.role);
    }
  }, [user, userFiltered]);

  function signIn() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential?.user)
        const userPerms = ({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          role: "new"
        })
        addDoc(collection(db, 'userPermissions'), userPerms)
        setEmail('')
        setPassword('')
      })
      .catch((error) => {
        console.log(error.code)
        switch (error.code) {
          case "auth/email-already-in-use":
            alert('User already exists')
            break;

          default:
            break;
        }
      })
  }
  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setUser(auth.currentUser)
        setEmail('')
        setPassword('')

      })
      .catch((error) => {
        console.log(error.code)
        switch (error.code) {
          case 'auth/invalid-credential':
            alert('User not found')
            break;

          default:
            break;
        }
      })
  }
  function logout() {
    signOut(auth)
      .then(() => {
        setUser({})
        setEmail('')
        setPassword('')
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
      password, setPassword,
      user, setUser,
      userName,
      role,
    }}>
      {children}
    </UserContext.Provider>
  )
}