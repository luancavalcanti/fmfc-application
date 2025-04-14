import styled from "styled-components";

export const FormStyled = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    margin: 0 150px;
    @media (max-width: 1024px){
        margin: 0 100px;
    }
    @media (max-width: 768px){
        margin: 0 50px;
    }
    @media (max-width: 480px){
        margin: 0;
        border-radius: 0px;
    }
    #fieldContainer{
        display: flex;
        flex-direction: column;
        label{
            color: #555;
            align-self: flex-start;
        }
        input, select, textarea{ 
            margin-bottom: 10px;
            color: #555;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #ccc;
            font-size: 16px;
            &:focus {
                    outline: none;
                }
        }
    }
    #buttonContainer{
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
        #btn-create, #btn-update{
            background-color: #7dd87d;
            color: white;
            padding: 10px 20px;
            &:hover{
                background-color: white;
                color: #7dd87d;
                border: 1px solid #7dd87d;
            }
        }
        #btn-cancel{
            background-color: #777;
            color: white;
            padding: 10px 20px;
            &:hover{
                background-color: white;
                color: #555;
                border: 1px solid #777;
            }
        }
        #btn-delete{
            background-color: #f95959;
            color:white;
            padding: 10px 20px;
            &:hover{
                background-color: white;
                color: #f95959;
            }
        }
    }

`