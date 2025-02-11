import { useNavigate } from "react-router-dom"
import useGetData from "../hooks/useGetData"

export default function MenuUser({ userEmail }) {
    const { data: employees } = useGetData('employees')
    const { data: contracts } = useGetData('contracts')
    const { data: complaints } = useGetData('complaints')
    const userFiltered = employees.filter(user => user.email === userEmail)[0]
    const userName = `${userFiltered?.name} ${userFiltered?.lastname}`
    const userContracts = contracts?.filter(contract => contract.employees.includes(userName))
    const navigate = useNavigate()
    function handleView(complaints, contract) {
        navigate('complaints', { state: { complaints, contract } })
    }
    const tempStyle = {
        border: '1px solid black',
        padding: '10px',
        margin: '10px',
        backgroundColor: "grey",
        borderRadius: "10px"
    }
    return (
        <>
            <h1>Menu User</h1>
            {userContracts && userContracts.map((contract, index) => {
                const complaintsUser = (complaints?.filter(complaint =>
                    complaint.contract === `${contract.client} - ${contract.service}`
                ))
                return (<div key={index} style={tempStyle}>
                    <h2>{contract.client}</h2>
                    <p>Complaint(s): {complaintsUser.length}</p>
                    <button onClick={() => handleView(complaintsUser, contract.client)}>view</button>
                </div>)
            })}
        </>
    )
}