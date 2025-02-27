import { useLocation, useNavigate } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import MenuContainer from "../components/MenuContainer"
import { MenuContainerStyled } from "../styles/MenuContainerStyled"

export default function MenuClients({ employeeUser }) {
    const location = useLocation()
    const { employee } = location.state || ""
    const { data: clients } = useGetData('clients')
    const { data: contracts } = useGetData('contracts')
    let contractList = []
    let clientList = []
    let user = ""
    if (employeeUser) {
        contractList = contracts?.filter(contract => contract.employees.includes(employeeUser))
        clientList = [...new Set(contractList.map(contract => contract.client))]
        user = employeeUser

    } else if (employee) {
        contractList = contracts?.filter(contract => contract.employees.includes(employee))
        clientList = [...new Set(contractList.map(contract => contract.client))]
        user = employee
    } else {
        contractList = contracts
        clientList = clients.map(client => client.name);
    }
    const navigate = useNavigate()
    function handleView(contractsView, title) {
        navigate('/home/contracts', { state: { contractsView, title } })
    }

    return (
        <>
            <MenuContainerStyled>
                <div id="container-head">
                    {user && <button id="btn-back" onClick={() => navigate(-1)}>Back</button>}
                    {user ? <h2>{user}</h2> : <h2>Clients</h2>}
                </div>
                <div id="groupContainer" >
                    {clientList.map((client, index) => {
                        const contractFiltered = contractList.filter(item => item.client === client)
                        const subtitle = `Contract(s): ${contractFiltered.length}`
                        return (
                            <MenuContainer
                                key={index}
                                title={client}
                                subtitle={subtitle}
                                handleView={() => handleView(contractFiltered, client)}
                                buttonHidden={contractFiltered.length === 0 ? true : false}
                            />
                        )
                    })}
                </div>
            </MenuContainerStyled>
        </>
    )
}