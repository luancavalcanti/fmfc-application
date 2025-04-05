import styled from "styled-components"

const BoxContainer = styled.div`
        display: flex;
        min-width: 350px;
        box-sizing: border-box;
        @media (max-width: 500px){
            width: 100%;
        }
        button{
            background-color: white;
            width: 100%;
            padding: 20px;
            border-radius: 20px;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
            color:#555;
            &:disabled {
                background-color: #ccc;
                color: #555;
                cursor: default;
                .subtitle {
                    color: #555;
                }
            }
            &:hover{
                background-color:rgba(51, 189, 202, 0.22);
                &:disabled {
                background-color: #ccc;
                color: #555;
                cursor: default;
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
            flex-direction: column;
            p{
                margin: 0;
                font-size: 1.3em;
            }
        }
        .subtitle {
            color:#888;
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
                        {title2 && <p>{title2}</p>}
                        <p>{title}</p>
                    </div>
                    <div className="subtitle">
                        <p>{subtitle}</p>
                    </div>
                </div>
            </button>
        </BoxContainer>
    )
}