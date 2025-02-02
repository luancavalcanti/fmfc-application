import useGetData from "../hooks/useGetData";
import { useNavigate } from "react-router-dom";

export default function MenuAdmin() {
    const { data: userPermissions } = useGetData('userPermissions')
    const { data: employees } = useGetData('employees')
    const { data: clients } = useGetData('clients')
    const { data: services } = useGetData('services')
    const { data: contracts } = useGetData('contracts')

    const navigate = useNavigate()
    const tempStyle = {
        border: '1px solid black',
        padding: '10px',
        margin: '10px',
    }
    return (
        <div>
            <div style={tempStyle}>
                <h2>UserPermissions</h2>
                <p>{userPermissions.length}</p>
                <button onClick={() => navigate('admin/permissions')}>View</button>
            </div>
            <div style={tempStyle}>
                <h2>Employees</h2>
                <p>{employees.length}</p>
                <button onClick={() => navigate('admin/employees')}>View</button>
            </div>
            <div style={tempStyle}>
                <h2>Clients</h2>
                <p>{clients.length}</p>
                <button onClick={() => navigate('admin/clients')}>View</button>
            </div>
            <div style={tempStyle}>
                <h2>Services</h2>
                <p>{services.length}</p>
                <button onClick={() => navigate('admin/services')}>View</button>
            </div>
            <div style={tempStyle}>
                <h2>Contracts</h2>
                <p>{contracts.length}</p>
                <button onClick={() => navigate('admin/contracts')}>View</button>
            </div>
        </div>
    )
}