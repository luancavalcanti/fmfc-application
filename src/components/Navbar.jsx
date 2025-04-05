import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { UserContext } from "../context/UserContext";
import Logo from '/public/logo.png'
import { IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const NavBarStyled = styled.div`
    background-color: #33BECA;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 80px;
    
    #side-menu{
        /* display: none; */
        background-color: #33BECA;
        height: calc(100vh - 80px);
        top: 80px;
        left: 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        padding: 0 30px;
        z-index: 9999;
        width: 250px;
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
        #item{
            margin: 10px;
            cursor: pointer;
            /* background-color: red; */
            padding: 8px;
            color: white;
            border-bottom: 1px solid white;
            &:hover{
                color: #33BECA;
                background-color: white;
            }
        }
    }
    #burger-menu{
        order: 1;
        display: none;
        cursor: pointer;
        font-size: 2.3rem;
    }
    #logo{
        display: flex;
        cursor: pointer;
        order: 1;
        img{
            width: 50px;
        }
        
    }
    #menuItems{
        display: flex;
        flex-direction: row;
        order: 1;
        gap: 20px;
        #item{
            cursor: pointer;
            margin: 0;
            border-right: 1px solid white;
            padding-right: 20px;
            &:hover{
                color: white;
            }
            &:last-child{
                border: none;
            }
        }
    }
    @media (max-width: 768px) {
        #burger-menu{
            display: block;
        }
        #menuItems{
            display: none;
        }
    }
    #profile{
        display: flex;
        flex-direction: row;
        align-items: center;
        order:3;
        position: relative;
        gap: 10px;
        cursor: pointer;
        &:hover{
            color: white;
        }
        #userName{
            
        }
        
        #userIcon{
            font-size: 2rem;
            cursor: pointer;
        }
    }
    #dropdown{
        display: flex;
        flex-direction: column;
        position: absolute;
        padding: 8px;
        top: 80px  ;
        right: 0;
        background-color: #aaa;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 0 0 10px 10px;
        z-index: 1;
    }
`

export default function Navbar() {
    const navigate = useNavigate();
    const [dropDown, setDropdown] = useState(false)
    const { logout, user, role } = useContext(UserContext);
    const [sideMenu, setSideMenu] = useState(false);

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <NavBarStyled>
            <div onClick={() => setSideMenu(!sideMenu)} id="burger-menu">
                <IoMenu />
            </div>
            {sideMenu && <div id="side-menu">
                <h2 id="item" onClick={() => { navigate("/home"), setSideMenu(!sideMenu) }}>Home</h2>
                {role === "admin" && <>
                    <h2 id="item" onClick={() => { navigate("clients"), setSideMenu(!sideMenu) }}>Clients</h2>
                    <h2 id="item" onClick={() => { navigate("employee"), setSideMenu(!sideMenu) }}>Employees</h2>
                    <h2 id="item" onClick={() => { navigate("admin"), setSideMenu(!sideMenu) }}>Admin</h2>
                </>}

            </div>}
            <div id="logo" onClick={() => navigate('/home')}>
                <img src={Logo} alt="Logo" />
                <p>FMFC</p>
            </div>
            <div id="menuItems">
                {role === 'admin' && (
                    <>
                        <p id="item" onClick={() => navigate("/home")}>Home</p>
                        <p id="item" onClick={() => navigate("clients")}>Clients</p>
                        <p id="item" onClick={() => navigate("employee")}>Employees</p>
                        <p id="item" onClick={() => navigate("admin")}>Admin</p>
                    </>
                )}
            </div>
            <div id="profile" onClick={() => setDropdown(!dropDown)}>
                <p id="userName" >
                    {user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1)}
                </p>
                <FaUserCircle id="userIcon" />
            </div>
            {dropDown && <div id="dropdown">
                {role}
                <button onClick={handleLogout}>Logout</button>
            </div>}
        </NavBarStyled>
    )
}