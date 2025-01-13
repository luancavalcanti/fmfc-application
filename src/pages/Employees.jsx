import { useContext } from "react"
import { EmployeeContext } from "../contex/EmployeeContext"
import FormInput from "../components/FormInput"

export default function Employees(){
    const { 
        employees,
        formEmployee,
        editing,
        handleFormEmployee,
        cancelEdit,
        handleChangeInput,
        handleEditEmployee,
        handleRemoveEmployee,
    } = useContext(EmployeeContext)

    const formObject = [
        {
            label:"Name",
            type:"text",
            name:"name",
            value: formEmployee.name,
            onChange: handleChangeInput
        },
        {
            label:"Lastname",
            type:"text",
            name:"lastname",
            value: formEmployee.lastname,
            onChange: handleChangeInput
        },
        {
            label:"E-mail",
            type:"email",
            name:"email",
            value: formEmployee.email,
            onChange: handleChangeInput
        },
        {
            label:"Phone",
            type:"tel",
            name:"phone",
            value: formEmployee.phone,
            onChange: handleChangeInput
        },
        {
            label:"Lenguage",
            type:"text",
            name:"lenguage",
            value: formEmployee.lenguage,
            onChange: handleChangeInput
        },
        {
            label:"DoB",
            type:"date",
            name:"dob",
            value: formEmployee.dob,
            onChange: handleChangeInput
        },
        {
            label:"Date In",
            type:"date",
            name:"dateIn",
            value: formEmployee.dateIn,
            onChange: handleChangeInput
        },
    ]
    return(
        <>
        <h1>Employees</h1>
        <h2>Employee Form</h2>
        {
            formObject.map((object, index) => {
                
                const { label, type, name, value, onChange } = object
                console.log(label)
                return(
                    <div key={index}>
                        <FormInput 
                            label={label}
                            type={type}
                            name={name}
                            value={value}
                            onChange={onChange}
                        />
                    </div> 
                )
            })
        }
        <div>
            {
                editing
                ?<button onClick={handleFormEmployee}>Editar</button>
                :<button onClick={handleFormEmployee}>Criar</button>
            }
        </div>
        <h2>Employees List</h2>
        <table>
            <thead>
                <tr>
                    {
                        formObject.map((object, index) => <th key={index}>{object.label}</th>)
                    }
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees?.map((employee, index) => (
                        <tr key={index}>
                            {
                                formObject.map((object, index) => {
                                    const { type, name, value, onChange } = object
                                    return(
                                            <td key={index}>
                                                {employee[name]}
                                                {
                                                    editing && employee.id === formEmployee.id && 
                                                    <input type={type} name={name} value={value} onChange={onChange}/>
                                                }
                                            </td>          
                                    )
                                })
                            }
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