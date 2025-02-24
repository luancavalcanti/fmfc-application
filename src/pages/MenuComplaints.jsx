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
        background-color: ${props => props.statusColor?.color || 'transparent'};
        margin: 25px 5px 25px 0;
        border-radius: 10px;
    }
`

export default function MenuComplaints() {
    const location = useLocation()
    const { complaintsView, client, title, service } = location.state
    const { data: status } = useGetData('status')
    const navigate = useNavigate()
    function handleView(complaintView, complaintId) {
        navigate('complaint', { state: { complaintView, complaintId } })
    }
    return (
        <MenuContainerStyled>
            <button id="btn-back" onClick={() => navigate(-1)}>Back</button>
            <h2>{title}</h2>
            {title !== client && <h2 style={{ color: "#888", margin: "2px 0 2px 0" }}>{client}</h2>}
            <h2 style={{ color: "#888", marginTop: "0" }}>{service}</h2>
            <div id="groupContainer">
                {complaintsView && complaintsView.map((complaintView, index) => {
                    const statusFiltered = status.filter(status => status.name === complaintView.status)[0]
                    const title = `Status: ${statusFiltered?.name}`
                    const title2 = `Complaint ${index + 1}`
                    const subtitle = `${complaintView.complaint}`
                    return (
                        <ComplaintContainer statusColor={statusFiltered} key={index}>
                            <div id="status"></div>
                            <MenuContainer
                                title={title}
                                title2={title2}
                                subtitle={subtitle}
                                handleView={() => handleView(complaintView, complaintView.id, statusFiltered?.color)}
                            />
                        </ComplaintContainer>
                    )
                })}
            </div>
        </MenuContainerStyled>
    );
}
