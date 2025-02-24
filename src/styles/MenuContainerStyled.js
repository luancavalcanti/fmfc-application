import styled from "styled-components";

export const MenuContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    #btn-back{
        width: 100px;
        margin-left: 20px;
        margin-top: 10px;
    }
    #groupContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        hr {
            width: 100%;
            color: red;
            background-color: red;
        }
    }

`;