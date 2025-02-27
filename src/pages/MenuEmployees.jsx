import { useNavigate } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import MenuContainer from "../components/MenuContainer"
import { MenuContainerStyled } from "../styles/MenuContainerStyled"

export default function MenuEmployees() {
    const { data: employees } = useGetData('employees')
    const { data: contracts } = useGetData('contracts')
    const navigate = useNavigate()
    function handleView(employee) {
        navigate('/home/clients', { state: { employee } })
    }
    return (
        <>
            <MenuContainerStyled>
                <div id="container-head">
                    <h2>Employees</h2>
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