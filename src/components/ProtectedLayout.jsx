import { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProtectedLayout() {
    const { logout, user, role } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
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
                <button onClick={() => navigate('/home')}>Home</button>
                <Outlet />
                {location.pathname !== '/home' && (
                    <button onClick={() => navigate(-1)}>Back</button>
                )}
            </>
            :
            <>
                <p>You need permissions to access this page.</p>
                <button onClick={() => navigate('/login')}>Login</button>
            </>
    );
}