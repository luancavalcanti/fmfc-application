import styled from "styled-components";
import useGetData from "../hooks/useGetData";
const ComplaintsContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    background-color: #eee;
    padding: 20px;
    margin: 0 150px;
    border-radius: 20px;
    @media (max-width: 1024px){
        margin: 0 100px;
    }
    @media (max-width: 768px){
        margin: 0 50px;
    }
    @media (max-width: 480px){
        margin: 0;
        border-radius: 0px;
    }
    
`
const Complaint = styled.div`
    display: flex;
    gap: 30px;
    margin: 2px;
    #status{
        background-color: ${props => props?.color};
        width: 10px;
        border-radius: 10px;
        flex-shrink: 0;
    }
    #date{
        flex-shrink: 0;
    }
    #complaint-desc{
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    #status-name{
        margin-left: auto;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`
export default function Dashboard() {
    const { data: complaints } = useGetData("complaints")
    const { data: status } = useGetData("status")
    const sortedComplaints = complaints?.sort((a, b) => new Date(b.date_in) - new Date(a.date_in));
    const topThreeComplaints = sortedComplaints?.slice(0, 3);
    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Recent Complaints</h3>
            <ComplaintsContainer>
                {topThreeComplaints.map((complaint, index) => {
                    const formattedDate = new Date(complaint.date_in).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
                    const statusFiltered = status.filter(status => status.name === complaint.status)[0]
                    return (
                        <Complaint color={statusFiltered?.color} key={index} >
                            <div id="status"></div>
                            <p id="date">{formattedDate}</p>
                            <p id="complaint-desc">{complaint.complaint}</p>
                            <p id="status-name">{complaint.status}</p>
                        </Complaint>
                    );
                })}
            </ComplaintsContainer>
            <h3>Complaints chart</h3>
            <ComplaintsContainer>
                <img style={{ width: "100%" }} src="https://www.jaspersoft.com/content/dam/jaspersoft/images/graphics/infographics/column-chart-example.svg" alt="" />
            </ComplaintsContainer>
        </div>
    );
}
