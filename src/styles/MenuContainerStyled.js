import styled from "styled-components";

export const MenuContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    #empty{
        color: #555;
        #icon{
            font-size: 5rem;
        }
    }
    h3{
        color: #555;
    }
    #groupContainer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        width: 100%;
        box-sizing: border-box;
        hr {
            width: 100%;
            color: red;
            background-color: red;
        }
    }
`;