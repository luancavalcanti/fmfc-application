import { useLocation, useNavigate } from "react-router-dom"

export default function MenuComplaints() {
    const location = useLocation()
    const { complaints, contract } = location.state || {}
    const navigate = useNavigate()
    const tempStyle = {
        border: '1px solid black',
        padding: '10px',
        margin: '10px',
        backgroundColor: "grey",
        borderRadius: "10px"
    }

    function handleView(complaint) {
        navigate('complaint', { state: { complaint } })
    }
    return (
        <>
            <h1>{contract}</h1>
            {complaints.map((complaint, index) => (
                <div key={index} style={tempStyle}>
                    <h2>{complaint.contract.split(' - ')[1]}</h2>
                    <p>{complaint.complaint}</p>
                    <button onClick={() => handleView(complaint)}>view</button>
                </div>
            ))}
            <br />
        </>

    )
}