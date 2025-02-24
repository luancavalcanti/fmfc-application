import { useLocation, useNavigate } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import MenuContainer from "../components/MenuContainer"
import { MenuContainerStyled } from "../styles/MenuContainerStyled"

export default function MenuContracts() {
    const location = useLocation()
    const { contractsView, title } = location.state || {} //props
    const { data: complaints } = useGetData('complaints')
    const navigate = useNavigate()
    const contract = contractsView.map(contract => contract.client + " - " + contract.service)

    function handleView(complaintsView, client, title, service) {
        navigate('complaints', { state: { complaintsView, client, title, service } })
    }

    return (
        <MenuContainerStyled>
            <button id="btn-back" onClick={() => navigate(-1)}>Back</button>
            <h2>{title}</h2>
            <div id="groupContainer">
                {contractsView && contractsView.map((contractView, index) => {
                    const complaintsFiltered = complaints.filter(complaint => complaint.contract === contract[index])
                    const subtitle = `Complaint(s): ${complaintsFiltered.length}`
                    return (
                        <MenuContainer
                            key={index}
                            title={contractView.service}
                            subtitle={subtitle}
                            handleView={() => handleView(complaintsFiltered, contractView.client, title, contractView.service)}
                            buttonHidden={complaintsFiltered.length > 0 ? false : true}
                        />
                    )
                })}

            </div>
            <br />
            {/* <button onClick={() => navigate(-1)}>Back</button><br /> */}
        </MenuContainerStyled>

    )
}