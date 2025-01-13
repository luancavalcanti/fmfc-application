import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../firebase-config"
import { useEffect, useState } from "react"

export default function Employees(){
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
        <>
            
            <h1>Employees</h1>
            <h2>Employee Form</h2>
            <form>
                <div>
                    <label>Name</label> 
                    <input type="text" name="name" value={formEmployee.name} onChange={handleChangeInput}/>
                </div>
                <div>
                    <label>Lastname</label> 
                    <input type="text" name="lastname" value={formEmployee.lastname} onChange={handleChangeInput}/>
                </div>
                <div>
                    <label>E-mail</label> 
                    <input type="email" name="email" value={formEmployee.email} onChange={handleChangeInput}/>
                </div>
                <div>
                    <label>Phone</label> 
                    <input type="tel" name="phone" value={formEmployee.phone} onChange={handleChangeInput}/>
                </div>
                <div>
                    <label>Lenguage</label> 
                    <input type="text" name="lenguage" value={formEmployee.lenguage} onChange={handleChangeInput}/>
                </div>
                <div>
                    <label>DoB</label> 
                    <input type="date" name="dob" value={formEmployee.dob} onChange={handleChangeInput}/>
                </div>
                <div>
                    <label>Date In</label> 
                    <input type="date" name="dateIn" value={formEmployee.dateIn} onChange={handleChangeInput}/>
                </div>
                <div>
                    {
                        editing
                            ?<button onClick={handleFormEmployee}>Editar</button>
                            :<button onClick={handleFormEmployee}>Criar</button>
                    }
                    
                </div>
            </form>
            <h2>Employees List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>E-mail</th>
                        <th>Phone</th>
                        <th>Lenguage</th>
                        <th>DoB</th>
                        <th>Date In</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees?.map((employee, index) => (
                            
                            <tr key={index}>
                                <td>
                                    {employee.name}
                                    {
                                        editing && employee.id === formEmployee.id && 
                                        <input type="text" name="name" value={formEmployee.name} onChange={handleChangeInput}/>
                                    }
                                </td>
                                <td>
                                    {employee.lastname}
                                    {
                                        editing && employee.id === formEmployee.id && 
                                        <input type="text" name="lastname" value={formEmployee.lastname} onChange={handleChangeInput}/>
                                    }
                                </td>
                                <td>
                                    {employee.email}
                                    {
                                        editing && employee.id === formEmployee.id && 
                                        <input type="email" name="email" value={formEmployee.email} onChange={handleChangeInput}/>
                                    }
                                </td>
                                <td>
                                    {employee.phone}
                                    {
                                        editing && employee.id === formEmployee.id && 
                                        <input type="tel" name="phone" value={formEmployee.phone} onChange={handleChangeInput}/>
                                    }
                                </td>
                                <td>
                                    {employee.lenguage}
                                    {
                                        editing && employee.id === formEmployee.id && 
                                        <input type="text" name="lenguage" value={formEmployee.lenguage} onChange={handleChangeInput}/>
                                    }
                                </td>
                                <td>
                                    {employee.dob}
                                    {
                                        editing && employee.id === formEmployee.id && 
                                        <input type="date" name="lenguage" value={formEmployee.dob} onChange={handleChangeInput}/>
                                    }
                                </td>
                                <td>
                                    {employee.dateIn}
                                    {
                                        editing && employee.id === formEmployee.id && 
                                        <input type="date" name="dateIn" value={formEmployee.dateIn} onChange={handleChangeInput}/>
                                    }
                                </td>
                                <td>
                                    {
                                        editing 
                                            ?(employee.id === formEmployee.id && 
                                                <>
                                                    <button onClick={()=>handleEditEmployee(employee)}>Update</button>
                                                    <button onClick={cancelEdit}>Cancel</button>
                                                </>
                                            )
                                            :( 
                                                <>
                                                <button onClick={()=>handleEditEmployee(employee)}>Edit</button>
                                                <button onClick={()=>handleRemoveEmployee(employee)}>Remove</button>
                                                </>
                                            )
                                    }
                                    
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}