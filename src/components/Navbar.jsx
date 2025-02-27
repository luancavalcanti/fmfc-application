import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { UserContext } from "../context/UserContext";
import Logo from '/public/logo.png'

const NavBarStyled = styled.div`
    background-color: #33BECA;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 80px;
    #logo{
        display: flex;
        cursor: pointer;
        img{
            width: 50px;
        }
    }
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

export default function Navbar() {
    const navigate = useNavigate();
    const [dropDown, setDropdown] = useState(false)
    const { logout, user, role } = useContext(UserContext);

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <NavBarStyled>
            <div id="logo" onClick={() => navigate('/home')}>
                <img src={Logo} alt="Logo" />
                <p>FMFC</p>
            </div>
            <div id="menuItems">
                {role === 'admin' && (
                    <>
                        <button onClick={() => navigate("clients")}>Client</button>
                        <button onClick={() => navigate("employee")}>Employee</button>
                        <button onClick={() => navigate("admin")}>Admin</button>
                    </>
                )}
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
    )
}