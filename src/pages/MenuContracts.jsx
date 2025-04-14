import { useLocation, useNavigate } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import MenuContainer from "../components/MenuContainer"
import { MenuContainerStyled } from "../styles/MenuContainerStyled"
import { useContext, useEffect } from "react"
import { ContractContext } from "../context/ContractsContext"
import { BreadcrumbContext } from "../context/BreadcrumbContext"
import { TbReportSearch } from "react-icons/tb"

export default function MenuContracts() {
    const location = useLocation()
    const { title, lastCrumb, user, role } = location.state || {} //props
    const { data: complaints } = useGetData('complaints')
    const { crumbs, setCrumbs } = useContext(BreadcrumbContext)
    const navigate = useNavigate()
    const { defaultValues, fields, collectionName } = useContext(ContractContext)
    const { data } = useGetData('contracts')
    let contracts = (data.filter(contract => contract.client === title))
    defaultValues.client = title;
    const name = "Contracts"
    if (user) {
        contracts = contracts.filter(contract => contract.employees.includes(user))
    }

    useEffect(() => {
        setCrumbs([...lastCrumb, title])
    }, [setCrumbs, title, lastCrumb])

    function handleView(client, title, service, role) {
        navigate('complaints', { state: { client, title, service, lastCrumbs: crumbs, role } })
    }

    return (
        <MenuContainerStyled>
            <h3>Contracts List</h3>
            {contracts.length === 0 &&
                <div id="empty">
                    <TbReportSearch id="icon" />
                    <p>This client does not have any contracts yet...</p>
                </div>
            }
            <div id="groupContainer">
                {contracts && contracts.map((contract, index) => {
                    const complaintsFiltered = complaints?.filter(complaint => complaint.service === contract.service && complaint.client === contract.client)
                    return (
                        <MenuContainer
                            key={index}
                            title={contract.service}
                            subtitle={"Complaint(s): " + complaintsFiltered.length}
                            handleView={() => handleView(title, title, contract.service, role)}
                        />
                    )
                })}
                {role === "admin" && <MenuContainer
                    title={"Add"}
                    subtitle={"New Contract"}
                    handleView={() => navigate(`/home/admin/contracts/new`, {
                        state: {
                            defaultValues: { ...defaultValues, employees: [user] }, fields,
                            name,
                            collectionName,
                            lastCrumbs: crumbs,
                        }
                    })}
                />}
            </div>
            <br />
        </MenuContainerStyled>

    )
}