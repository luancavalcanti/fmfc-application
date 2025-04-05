import { useLocation, useNavigate } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import MenuContainer from "../components/MenuContainer"
import styled from "styled-components";
import { MenuContainerStyled } from "../styles/MenuContainerStyled";

const ComplaintContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    #status{
        width: 20px;
        background-color: ${props => props.color?.color || 'transparent'};
        margin: 25px 5px 25px 0;
        border-radius: 10px;
    }
`
export default function MenuComplaints() {
    const location = useLocation()
    const { client, title, service } = location.state
    const { data: status, getData } = useGetData('status')
    const { data: complaints } = useGetData('complaints')
    const complaintsFiltered = complaints?.filter(complaint => complaint.client === client && complaint.service === service)
    const navigate = useNavigate()
    function handleView(complaint, complaintId, color) {
        navigate('complaint', { state: { complaint, complaintId, color } })
    }

    return (
        <MenuContainerStyled>
            <div id="container-head">
                <button id="btn-back" onClick={() => navigate(-1)}>Back</button>
                <h2>{title}</h2>
            </div>
            {title !== client && <h2 style={{ color: "#888", margin: "2px 0 2px 0" }}>{client}</h2>}
            <h2 style={{ color: "#888", marginTop: "0" }}>{service}</h2>
            <div id="groupContainer">
                {complaintsFiltered && complaintsFiltered.map((complaint, index) => {
                    getData()
                    const statusFiltered = status.filter(status => status.name === complaint.status)[0]
                    const title = `Status: ${statusFiltered?.name}`
                    {/* const title2 = `Complaint ${index + 1}` */ }
                    const subtitle = `${complaint.complaint}`
                    return (
                        <ComplaintContainer color={statusFiltered} key={index}>
                            <div id="status"></div>
                            <MenuContainer
                                title={subtitle}
                                // title2={title2}
                                subtitle={title}
                                handleView={() => handleView(complaint, complaint.id, statusFiltered?.color)}
                            />
                        </ComplaintContainer>
                    )
                })}
            </div>
        </MenuContainerStyled>
    );
}
