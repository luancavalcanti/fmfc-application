import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProtectedLayout() {
    const { logout, user, role } = useContext(UserContext);
    const navigate = useNavigate();
    function handleLogout() {
        logout();
        navigate('/login');
    }
    return (
        user
            ?
            <>
                <p>role: {role}</p>
                <h2>user: {user.email}</h2>
                <button onClick={handleLogout}>Logout</button>
                <Outlet />
                <button onClick={() => navigate('/home')}>Back</button>
            </>
            :
            <>
                <p>You need permissions to access this page.</p>
                <button onClick={() => navigate('/login')}>Login</button>
            </>
    );
}