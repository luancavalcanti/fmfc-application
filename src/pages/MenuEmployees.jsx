import { useNavigate } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import MenuContainer from "../components/MenuContainer"
import { MenuContainerStyled } from "../styles/MenuContainerStyled"
import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "../context/EmployeeContext"
import { BreadcrumbContext } from "../context/BreadcrumbContext"

export default function MenuEmployees() {
    const { data: contracts } = useGetData('contracts')
    const { defaultValues, collectionName, fields } = useContext(EmployeeContext)
    const { data: employees } = useGetData('employees')
    const navigate = useNavigate()
    const name = "Employees"
    const { crumbs, setCrumbs } = useContext(BreadcrumbContext)

    useEffect(() => {
        setCrumbs(['Employees'])
    }, [setCrumbs])

    function handleView(employee) {
        navigate('/home/employee/clients', { state: { employee, lastCrumbs: crumbs } })
    }
    return (
        <>
            <MenuContainerStyled>
                <h3>Employees List</h3>
                <div id="groupContainer" >
                    {employees && employees.map((employee, index) => {
                        const employeeFullName = `${employee.name} ${employee.lastname}`
                        const contractsFiltered = contracts?.filter(contract => contract.employees.includes(employeeFullName))
                        const subtitle = `Contracts: ${contractsFiltered.length}`
                        return (
                            <React.Fragment key={index}>
                                <MenuContainer
                                    title={employeeFullName}
                                    subtitle={subtitle}
                                    handleView={() => handleView(employeeFullName)}
                                />
                                {index === employees.length - 1 && employees &&
                                    <MenuContainer
                                        title={"Add"}
                                        subtitle={"New Employee"}
                                        handleView={
                                            () => navigate(`/home/admin/employees/new`,
                                                { state: { defaultValues, fields, name, collectionName, lastCrumbs: crumbs } }
                                            )
                                        }
                                    />
                                }

                            </React.Fragment>
                        )
                    })}
                </div>
            </MenuContainerStyled>
        </>
    )
}