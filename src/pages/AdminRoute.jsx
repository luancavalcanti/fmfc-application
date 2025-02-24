import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function AdminRoute() {
    const { user, role } = useContext(UserContext);

    if (!user || role !== 'admin') {
        return <Navigate to="/home" />;
    }

    return <Outlet />;
}