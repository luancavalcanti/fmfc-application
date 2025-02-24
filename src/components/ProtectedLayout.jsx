import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";

const NavBarStyled = styled.div`
    background-color: #33BECA;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    #profile{
        display: flex;
        flex-direction: column;
        position: relative;
        #button{
           &:focus{
            border: none;
           }
        }
        #dropdown{
            display: flex;
            flex-direction: column;
            position: absolute;
            padding-top: 10px;
            top: 130%;
            left: 0;
            background-color: #aaa;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            z-index: 1;
        }
    }
`

export default function ProtectedLayout() {
    const { logout, user, role } = useContext(UserContext);
    const [dropDown, setDropdown] = useState(false)
    const navigate = useNavigate();
    function handleLogout() {
        logout();
        navigate('/login');
    }
    return (
        user?.accessToken
            ?
            <>
                <NavBarStyled>
                    <button onClick={() => navigate('/home')}>Home</button>
                    <div id="logo">
                        <h2>FMFC</h2>
                    </div>
                    <div id="profile">
                        <button onClick={() => setDropdown(!dropDown)}>
                            {user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1)}
                        </button>

                        {dropDown && <div id="dropdown">
                            {role}
                            <button onClick={handleLogout}>Logout</button>
                        </div>}
                    </div>
                </NavBarStyled>
                <Outlet />
            </>
            :
            <>
                <p>You need permissions to access this page.</p>
                <button onClick={() => navigate('/login')}>Login</button>
            </>
    );
}