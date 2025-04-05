import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Navbar from "./Navbar";



export default function ProtectedLayout() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        user?.accessToken
            ?
            <>
                <Navbar />
                <Outlet />
            </>
            :
            <>
                <p>You need permissions to access this page.</p>
                <button onClick={() => navigate('/login')}>Login</button>
            </>
    );
}