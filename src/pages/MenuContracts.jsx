import { useLocation, useNavigate } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import MenuContainer from "../components/MenuContainer"
import { MenuContainerStyled } from "../styles/MenuContainerStyled"

export default function MenuContracts() {
    const location = useLocation()
    const { title } = location.state || {} //props
    const { data: complaints } = useGetData('complaints')
    const navigate = useNavigate()
    // const contract = contractsView.map(contract => contract.client + " - " + contract.service)
    function handleView(client, title, service) {
        navigate('complaints', { state: { client, title, service } })
    }

    const services = [...new Set(complaints.map(complaint => complaint.service))]

    return (
        <MenuContainerStyled>
            <div id="container-head">
                <button id="btn-back" onClick={() => navigate(-1)}>Back</button>
                <h2>{title}</h2>
            </div>
            <div id="groupContainer">
                {services && services.map((service, index) => {
                    const complaintsFiltered = complaints?.filter(complaint => complaint.service === service)
                    return (
                        <MenuContainer
                            key={index}
                            title={service}
                            subtitle={"Complaint(s): " + complaintsFiltered.length}
                            handleView={() => handleView(title, title, service)}
                        />
                    )
                })}
            </div>
            <br />
            {/* <button onClick={() => navigate(-1)}>Back</button><br /> */}
        </MenuContainerStyled>

    )
}