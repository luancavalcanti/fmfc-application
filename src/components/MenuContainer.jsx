import styled from "styled-components"

const BoxContainer = styled.div`
        display: flex;
        min-width: 350px;
        padding: 5px;
        margin: 5px 0;
        background-color:rgba(51, 189, 202, 0.66);
        border-radius: 30px;
        box-sizing: border-box;
        @media (max-width: 500px){
            width: 100%;
        }
        button{
            width: 100%;
            padding: 0.2em;
            margin: 0;
            border-radius: 25px;
            background-color: #33BECA;
            color:white;
            &:disabled {
                background-color: #ccc;
                color: #555;
                cursor: default;
                .subtitle {
                    color: #555;
                }
            }
        }
        .titleContainer {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .title, .subtitle {
            display: flex;
            text-align: left;
        }
        .title {
            /* background-color: red; */
            flex-direction: column;
            padding: 10px 10px 5px 10px;
            h2{
                margin: 0;
            }
        }
        .subtitle {
            padding: 5px 10px 10px 10px;
            /* background-color: blue; */
            color:#cdd;
            p{
                margin: 0;
            }
        }
    `

export default function MenuContainer({ title, title2, subtitle, handleView, buttonHidden = false }) {
    return (
        <BoxContainer>
            <button onClick={handleView} disabled={buttonHidden}>
                <div className="titleContainer">
                    <div className="title">
                        {title2 && <h2>{title2}</h2>}
                        <h2>{title}</h2>
                    </div>
                    <div className="subtitle">
                        <p>{subtitle}</p>
                    </div>
                </div>
            </button>
        </BoxContainer>
    )
}