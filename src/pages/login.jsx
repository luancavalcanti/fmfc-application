import { useContext } from "react"
import TextField from "../components/TextField"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Logo from '/public/logo.png'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to bottom right, #33BECA,rgb(33, 124, 133));
    height: 100vh;

    #loginContainer{
        display: flex;
        flex-direction: column;
        background-color: #33BECA;
        padding: 40px;
        border-radius: 20px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        img {
            align-self:center;
            height: 120px;
            width: 120px;
        }
        input {
            padding: 15px;
            border-radius: 10px;
            font-size: 1em;
            border: none;
            box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
            background-color: #eee;
            &:focus {
                outline: none;
                box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
            }
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
                    label="E-mail"
                    type="email"
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <br />
                <div>
                    <button onClick={handleLogin}>Login</button>
                    {/* <button onClick={signIn}>Register user</button> */}
                </div>
            </div>
        </Container>
    )

}