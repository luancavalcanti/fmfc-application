import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Navbar from "./Navbar";
import { Breadcrumb } from "./Breadcrumb";
import styled from "styled-components";

const Page = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export default function ProtectedLayout() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate()

    return (
        user?.accessToken
            ?
            <Page>
                <Navbar />
                <Breadcrumb />
                <Outlet />
            </Page>
            :
            <>
                <p>You need permissions to access this page.</p>
                <button onClick={() => navigate('/login')}>Login</button>
            </>
    );
}