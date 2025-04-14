import { useLocation, useNavigate } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import MenuContainer from "../components/MenuContainer"
import { MenuContainerStyled } from "../styles/MenuContainerStyled"
import React, { useContext, useEffect } from "react"
import { ClientContext } from "../context/ClientContext"
import { UserContext } from "../context/UserContext"
import { BreadcrumbContext } from "../context/BreadcrumbContext"
import { TbReportSearch } from "react-icons/tb"

export default function MenuClients() {
    const location = useLocation()
    const { employee, lastCrumbs } = location.state || ""
    const { collectionName, defaultValues, fields } = useContext(ClientContext)
    const { data: contracts } = useGetData('contracts')
    const { data: clients } = useGetData('clients')
    const { role, userName } = useContext(UserContext)
    const { crumbs, setCrumbs } = useContext(BreadcrumbContext)
    useEffect(() => {
        if (employee) {
            setCrumbs([...lastCrumbs, employee])
        } else {
            setCrumbs(["Clients"])
        }
    }, [setCrumbs])

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
    function handleView(title, user) {
        navigate('/home/contracts', { state: { title, lastCrumb: crumbs, user, role } })
    }
    console.log
    return (
        <>
            <MenuContainerStyled>
                <div id="container-head">
                    <h3>Clients List</h3>
                    {clientList.length === 0 &&
                        <div id="empty">
                            <TbReportSearch id="icon" />
                            <p>This employee does not have any contract associated...</p>
                        </div>
                    }
                </div>
                <div id="groupContainer" >
                    {clientList.map((client, index) => {
                        const contractFiltered = contractList.filter(item => item.client === client)
                        const subtitle = `Contract(s): ${contractFiltered.length}`
                        return (
                            <React.Fragment key={index}>
                                <MenuContainer
                                    title={client}
                                    subtitle={subtitle}
                                    handleView={() => handleView(client, user, role)}
                                />
                            </React.Fragment>
                        )
                    })}
                    {role === "admin" && user === '' && <MenuContainer
                        title={"Add"}
                        subtitle={"New Client"}
                        handleView={
                            () => navigate(`/home/admin/clients/new`,
                                {
                                    state: { defaultValues, fields, name, collectionName, lastCrumbs: crumbs },
                                }
                            )
                        }
                    />}
                </div>
            </MenuContainerStyled>
        </>
    )
}