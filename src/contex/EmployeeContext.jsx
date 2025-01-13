/* eslint-disable react/prop-types */
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase-config";

export const EmployeeContext = createContext()

export function EmployeeProvider({ children }){
    //Pegar a data de hoje no formato do campo input
    const getCurrentDate = () => { const today = new Date(); return today.toISOString().split("T")[0]; };
    const formDefault = {
        id: "",
        name: "",
        lastname: "",
        dob: "",
        phone: "",
        email: "",
        lenguage: "",
        dateIn: getCurrentDate(),
        dateOut: "",

    }
    const [employees, setEmployees] = useState([])
    const [formEmployee, setFormEmployee] = useState(formDefault)
    const [editing, setEditing] = useState(false)

    useEffect(()=>{
        getEmployees()
    },[])

    async function getEmployees() {
        const docRef = collection(db, "employees")
        const employeesSnapshot = await getDocs(docRef)
        const employeesDB = employeesSnapshot.docs.map(doc => (
            {
                id: doc.id,
                ...doc.data()
            }
        ))
        setEmployees(employeesDB)
    }
    async function handleFormEmployee(e) {
        e.preventDefault()
        if(editing){
            const employeeRef = doc(db, 'employees', formEmployee.id)
            await updateDoc(employeeRef, formEmployee)
            getEmployees()
            setFormEmployee(formDefault)
            setEditing(false)
            console.log("Employee editado com suceso!")
        }else{
            try{
                const docRef = await addDoc(collection(db, "employees"), formEmployee)
                console.log("Documento criado com id: ", docRef.id)
                getEmployees()
                setFormEmployee(formDefault)
            } catch (error){
                console.error("Erro ao adicionar no banco: ", error)
            }
        }
    }

    function cancelEdit(){
        setFormEmployee(formDefault)
        setEditing(false)
    }

    function handleChangeInput(e){
        const {name, value} = e.target
        setFormEmployee(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    function handleEditEmployee(employee){
        const {id, name, lastname, dob, phone, email, lenguage, dateIn, dateOut} = employee
        const editValues = {
            id,
            name,
            lastname,
            dob,
            phone,
            email,
            lenguage,
            dateIn,
            dateOut,
        }
        setFormEmployee(editValues)
        setEditing(true)
    }

    function handleRemoveEmployee(employee){
        deleteDoc(doc(db, 'employees', employee.id))
        getEmployees()
        console.log('Employee removido com sucesso!')
    }


    return(
        <EmployeeContext.Provider value={{
           employees,
            formEmployee,
            editing,
            handleFormEmployee,
            cancelEdit,
            handleChangeInput,
            handleEditEmployee,
            handleRemoveEmployee,
        }}>
            {children}
        </EmployeeContext.Provider>
    )
}