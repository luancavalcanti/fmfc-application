import { useLocation, useNavigate } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import MenuContainer from "../components/MenuContainer"
import { MenuContainerStyled } from "../styles/MenuContainerStyled"

export default function MenuClients() {
    const location = useLocation()
    const { clientsList, employeeName } = location.state || ""
    const { data: clients } = useGetData('clients')

    const { user, role } = useContext(UserContext)
    const { data: employees } = useGetData('employees')
    const { data: contracts } = useGetData('contracts')
    const userFiltered = employees.filter(employee => employee.email === user.email)[0]
    const userName = `${userFiltered?.name} ${userFiltered?.lastname}`
    let contractList = []
    if (employeeName) {
        contractList = contracts?.filter(contract => contract.employees.includes(employeeName))
    } else {
        contractList = contracts?.filter(contract => contract.employees.includes(userName))
    }

    const navigate = useNavigate()
    function handleView(contractsView, title) {
        navigate('/home/contracts', { state: { contractsView, title } })
    }

    const clientList = clientsList || clients.map(client => client.name);
    // const clientList = [...new Set(contractList.map(contract => contract.client))]

    return (
        <>
            <MenuContainerStyled>
                {role === "admin" && <button id="btn-back" onClick={() => navigate(-1)}>Back</button>}
                {employeeName ? <h2>{employeeName}</h2> : <h2>Clients</h2>}
                {clientList && clientList.map((client, index) => {
                    const contractFiltered = contractList.filter(item => item.client === client)
                    const subtitle = `Contract(s): ${contractFiltered.length}`
                    return (
                        <div id="groupContainer" key={index}>
                            <MenuContainer
                                title={client}
                                subtitle={subtitle}
                                handleView={() => handleView(contractFiltered, client)}
                            />
                        </div>

                    )
                })}
            </MenuContainerStyled>
        </>
    )
}