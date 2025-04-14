import { useContext } from "react"
import TextField from "../components/TextField"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Logo from '/public/logo.png'

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-image: linear-gradient(to bottom, #33BECA,rgb(33, 124, 133));
    height: 100vh;

    @media (max-width: 480px){
        /* justify-content: flex-start;  */
    }

    #loginContainer{
        display: flex;
        flex-direction: column;
        background-color: #eee;
        width: 40%;
        padding: 40px;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        box-sizing: border-box;
        img {
            align-self:center;
            height: 80px;
            width: 80px;
        }
        input {
            padding: 15px;
            border-radius: none;
            font-size: 1em;
            border: none;
            border-bottom: 1px solid #bbb;
            background-color: #eee;
            &:focus {
                outline: none;
            }
        }
        #btn-login {
            background-color: #33BECA;
            color: #fff;
            padding: 10px 30px;
        }

        @media (max-width: 1024px){
            width: 50%;
        }
        @media (max-width: 768px){
            width: 80%;
        }
        @media (max-width: 480px){
            border-radius: 0; 
            width: 100%;
        }
    }

`
export default function Login() {
    const { signIn, login, email, setEmail, password, setPassword } = useContext(UserContext)
    const navigate = useNavigate()

    function handleLogin() {
        login()
        navigate('/home')
    }

    return (
        <Container>
            <div id="loginContainer">
                <img src={Logo} alt="Logo" />
                <h2>FMFC</h2>
                <TextField
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <br />
                <TextField
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <br />
                <div>
                    <button id="btn-login" onClick={handleLogin}>Login</button>
                    {/* <button onClick={signIn}>Register user</button> */}
                </div>
            </div>
        </Container>
    )

}