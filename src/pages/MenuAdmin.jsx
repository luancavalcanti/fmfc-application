import { useContext } from "react";
import useGetData from "../hooks/useGetData";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import MenuContainer from "../components/MenuContainer";
import { MenuContainerStyled } from "../styles/MenuContainerStyled";

export default function MenuAdmin() {
    const { role } = useContext(UserContext)
    const { data: userPermissions } = useGetData('userPermissions')
    const { data: employees } = useGetData('employees')
    const { data: clients } = useGetData('clients')
    const { data: services } = useGetData('services')
    const { data: contracts } = useGetData('contracts')
    const { data: complaints } = useGetData('complaints')
    const { data: status } = useGetData('status')
    const navigate = useNavigate()

    const listGroup = [1]
    const objectsList = [
        { group: 1, title: 'UserPermissions', subtitle: `Item(s): ${userPermissions.length}`, handleView: () => navigate('permissions') },
        { group: 1, title: 'Employees', subtitle: `Item(s): ${employees.length}`, handleView: () => navigate('employees') },
        { group: 1, title: 'Clients', subtitle: `Item(s): ${clients.length}`, handleView: () => navigate('clients') },
        { group: 1, title: 'Services', subtitle: `Item(s): ${services.length}`, handleView: () => navigate('services') },
        { group: 1, title: 'Contracts', subtitle: `Item(s): ${contracts.length}`, handleView: () => navigate('contracts') },
        { group: 1, title: 'Complaints', subtitle: `Item(s): ${complaints.length}`, handleView: () => navigate('complaints') },
        { group: 1, title: 'Status', subtitle: `Item(s): ${status.length}`, handleView: () => navigate('status') }
    ]

    return (
        role === 'admin' ? (
            <>
                <MenuContainerStyled>
                    <div id="container-head">
                        <h3>Admin</h3>
                    </div>
                    {listGroup.map((group, index) => (
                        <div id="groupContainer" key={index}>
                            {objectsList.map((object, index) => (object.group === group &&
                                <MenuContainer
                                    key={index}
                                    title={object.title}
                                    subtitle={object.subtitle}
                                    handleView={object.handleView}
                                />
                            ))}
                            <br />
                        </div>
                    )
                    )}
                </MenuContainerStyled>
            </>
        )
            : (
                <p>You need permissions to access this page.</p>
            )

    )
}