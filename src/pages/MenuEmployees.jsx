import { useNavigate } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import MenuContainer from "../components/MenuContainer"
import { MenuContainerStyled } from "../styles/MenuContainerStyled"
import { FaPlus } from "react-icons/fa"
import { useContext } from "react"
import { EmployeeContext } from "../context/EmployeeContext"

export default function MenuEmployees() {
    const { data: contracts } = useGetData('contracts')
    const { data: employees, defaultValues, collectionName, fields } = useContext(EmployeeContext)
    const navigate = useNavigate()
    const name = "Employees"
    function handleView(employee) {
        navigate('/home/clients', { state: { employee } })
    }
    return (
        <>
            <MenuContainerStyled>
                <div id="container-head">
                    <h2>Employees</h2>
                    <button id="btn-add" onClick={() => navigate(`/home/admin/employees/new`, { state: { defaultValues, fields, name, collectionName } })}><FaPlus /></button>
                </div>
                <div id="groupContainer" >
                    {employees && employees.map((employee, index) => {
                        const employeeFullName = `${employee.name} ${employee.lastname}`
                        const contractsFiltered = contracts?.filter(contract => contract.employees.includes(employeeFullName))
                        const subtitle = `Contracts: ${contractsFiltered.length}`
                        return <MenuContainer
                            key={index}
                            title={employeeFullName}
                            subtitle={subtitle}
                            handleView={() => handleView(employeeFullName)}
                        />
                    })}
                </div>
            </MenuContainerStyled>
        </>
    )
}