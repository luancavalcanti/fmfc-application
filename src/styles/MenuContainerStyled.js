import styled from "styled-components";

export const MenuContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 10px;

    #container-head{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* position: relative; */
        #btn-back{
            width: 100px;
            margin-left: 20px;
            margin-top: 10px;
            /* position: absolute; */
            left: 0;
        }
        h2{
            flex-grow: 1;
            text-align: center;
        }
        #btn-add{
            position: absolute;
            display: flex;
            background-color: #7dd87d;
            color: white;
            right: 20px;
            border-radius: 30px;
            &:hover{
                background-color: white;
                border: 1px solid #7dd87d;
                color: #7dd87d;
            }
        }
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