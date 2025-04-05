import { useLocation, useNavigate } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import MenuContainer from "../components/MenuContainer"
import { MenuContainerStyled } from "../styles/MenuContainerStyled"
import { useContext } from "react"
import { ClientContext } from "../context/ClientContext"
import { FaPlus } from "react-icons/fa"
import { UserContext } from "../context/UserContext"

export default function MenuClients() {
    const location = useLocation()
    const { employee } = location.state || ""
    const { collectionName, data: clients, defaultValues, fields } = useContext(ClientContext)
    const { data: contracts } = useGetData('contracts')
    const { role, userName } = useContext(UserContext)
    const name = "Clients"
    let contractList = []
    let clientList = []
    let user = ""
    if (role !== "admin") {
        contractList = contracts?.filter(contract => contract.employees.includes(userName))
        clientList = [...new Set(contractList.map(contract => contract.client))]
        user = userName

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
                    {employee && <button id="btn-back" onClick={() => navigate(-1)}>Back</button>}
                    {user
                        ? <h2>{user}</h2>
                        : <>
                            <h2>Clients</h2>
                            <button id="btn-add" onClick={() => navigate(`/home/admin/clients/new`, { state: { defaultValues, fields, name, collectionName } })}><FaPlus /></button>
                        </>
                    }
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