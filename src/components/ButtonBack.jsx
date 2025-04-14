import { IoMdArrowRoundBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    border: 1px solid #ccc;
    height: 40px;
    margin: 0;
    padding: 0 15px;
    &:hover{
        background-color: #ccc;
    }
    box-sizing: border-box;
`

export default function ButtonBack() {
    const navigate = useNavigate()

    return (
        <Button onClick={() => navigate(-1)}><IoMdArrowRoundBack />Return</Button>
    )
}