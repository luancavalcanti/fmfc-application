import { useNavigate } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import MenuContainer from "../components/MenuContainer"
import { MenuContainerStyled } from "../styles/MenuContainerStyled"

export default function MenuEmployees() {
    const { data: employees } = useGetData('employees')
    const { data: contracts } = useGetData('contracts')
    const navigate = useNavigate()
    function handleView(contractsView, employeeName) {
        const clientsList = contractsView.map(contract => contract.client)
        navigate('/home/clients', { state: { clientsList, employeeName } })
    }
    return (
        <>
            <MenuContainerStyled>
                <button id="btn-back" onClick={() => navigate(-1)}>Back</button>
                <h2>Employees</h2>
                {employees && employees.map((employee, index) => {
                    const employeeFullName = `${employee.name} ${employee.lastname}`
                    const contractsFiltered = contracts?.filter(contract => contract.employees.includes(employeeFullName))
                    const subtitle = `Contracts: ${contractsFiltered.length}`
                    return (
                        <div id="groupContainer" key={index}>
                            <MenuContainer
                                title={employeeFullName}
                                subtitle={subtitle}
                                handleView={() => handleView(contractsFiltered, employeeFullName)}
                            />
                        </div>
                    )
                })}
            </MenuContainerStyled>
        </>
    )
}