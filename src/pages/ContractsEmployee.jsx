import { useState } from "react"
import SelectInput from "../components/SelectInput"
import useCRUD from "../hooks/useCRUD"
import Comments from "./Comments"

export default function ContractsEmployee({ uid, role }) {
    const formDefault = {
        employees: [],
        client: "",
        service: "",
        frequency: ""
    }

    const collectionName = 'contracts'
    const CRUD = useCRUD(collectionName, formDefault)
    const { data, formData, setFormData, handleForm } = CRUD
    const [contractID, setContractID] = useState('')
    let contractList = data
    const contractFilteredList = data?.filter(contract => contract.employees.includes(uid));
    const frequencies = ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Quarterly', 'Semiannually', 'Annually']
    const employeesList = useCRUD('employees')
    const clientList = useCRUD('clients')
    const serviceList = useCRUD('services')
    let employeesArray = formData.employees
    if (role !== 'admin') {
        contractList = contractFilteredList
    }
    function handleEmployeeChange(e) {
        const { value } = e.target
        if (!employeesArray.includes(value)) {
            employeesArray = [...employeesArray, value];
            setFormData(prevState => ({
                ...prevState,
                employees: employeesArray
            }))
        } else {
            alert('Employee already in list')
        }

    }

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function removeEmployee(employee) {
        setFormData(prevState => ({
            ...prevState,
            employees: employeesArray.filter((name) => name !== employee)
        }))
    }

    function showEmployeeName(uid) {
        const filteredEmployee = employeesList.data.filter(employee => employee.uid === uid)[0]
        const employeeName = `${filteredEmployee.name} ${filteredEmployee.lastname}`
        return employeeName
    }

    function handleComment(contractID) {
        setContractID(contractID)
    }
    return (
        <>
            <h1>Contracts</h1>
            {role === 'admin' &&
                <>
                    <div>
                        <SelectInput
                            label="Client"
                            name="client"
                            list={clientList.data.map(client => client.name)}
                            value={formData.client}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <SelectInput
                            label="Services"
                            name="service"
                            list={serviceList.data.map(service => service.desc)}
                            value={formData.service}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <SelectInput
                            label="Frequency"
                            name="frequency"
                            list={frequencies}
                            value={formData.frequency}
                            onChange={handleChange}
                        />
                    </div>
                    <div>

                        {
                            employeesArray.length > 0
                            && (
                                employeesArray.map((item, index) => (
                                    <div key={index}>
                                        <label>{showEmployeeName(item)}</label>
                                        <button onClick={() => removeEmployee(item)}>-</button>
                                    </div>
                                ))
                            )

                        }
                        <SelectInput
                            label="Employee"
                            name="employees"
                            list={employeesList.data.map(employee => ({ [employee.name + " " + employee.lastname]: employee.uid }))}
                            value=""
                            onChange={handleEmployeeChange}
                        />

                    </div>
                    <button onClick={() => handleForm(collectionName)}>Criar</button>
                </>
            }

            <h2>Contracts List</h2>

            <table>
                <thead>
                    <tr>
                        <td>Client</td>
                        <td>Service</td>
                        <td>Frequency</td>
                        <td>Employees</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>

                    {contractList.map((item, index) => (
                        <tr key={index}>
                            <td >{item.client}</td>
                            <td>{item.service}</td>
                            <td>{item.frequency}</td>
                            <td>
                                {item.employees?.map((employee, index) => (
                                    <p key={index}>{showEmployeeName(employee)}</p>
                                ))}
                            </td>
                            <td><button onClick={() => handleComment(item.id)}>Comments</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {contractID && <Comments contractID={contractID} />}
        </>
    )
}