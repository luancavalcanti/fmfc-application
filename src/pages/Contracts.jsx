import SelectInput from "../components/SelectInput"
import useCRUD from "../hooks/useCRUD"

export default function Contracts() {

    const formDefault = {
        employees: [],
        client: "",
        service: "",
        frequency: ""
    }

    const collectionName = 'contracts'
    const CRUD = useCRUD(collectionName, formDefault)
    const { data, formData, setFormData, handleForm } = CRUD
    const frequencies = ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Quarterly', 'Semiannually', 'Annually']
    const employeesList = useCRUD('employees')
    const clientList = useCRUD('clients')
    const serviceList = useCRUD('services')
    let employeesArray = formData.employees

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

    return (
        <>
            <h1>Contracts</h1>

            <div>
                <SelectInput
                    label="Client"
                    name="client"
                    list={clientList.data.map(client => client.name)}
                    onChange={handleChange}
                />
            </div>
            <div>
                <SelectInput
                    label="Services"
                    name="service"
                    list={serviceList.data.map(service => service.desc)}
                    onChange={handleChange}
                />
            </div>
            <div>
                <SelectInput
                    label="Frequency"
                    name="frequency"
                    list={frequencies}
                    onChange={handleChange}
                />
            </div>
            <div>

                {
                    employeesArray.length > 0
                    && (
                        employeesArray.map((item, index) => (
                            <div key={index}>
                                <label>{item}</label>
                                <button onClick={() => removeEmployee(item)}>-</button>
                            </div>
                        ))
                    )

                }
                <SelectInput
                    label="Employee"
                    name="employees"
                    list={employeesList.data.map(employee => employee.name + " " + employee.lastname)}
                    onChange={handleEmployeeChange}
                />

            </div>
            <button onClick={() => handleForm(collectionName)}>Criar</button>

            <h2>Contracts List</h2>

            {
                data.map((item, index) => (
                    <div key={index}>
                        <label><b>Client</b></label>
                        <p>{item.client}</p>
                        <br />
                        <label><b>Service</b></label>
                        <p>{item.service}</p>
                        <br />
                        <label><b>Frequency</b></label>
                        <p>{item.frequency}</p>
                        <br />
                        <label><b>Employees</b></label>
                        {item.employees?.map((employee, index) => (
                            <p key={index}>{employee}</p>
                        ))}
                    </div>
                ))
            }
        </>
    )
}