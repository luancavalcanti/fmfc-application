import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
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
    #btn-back{
        width: 100px;
        &:hover{
            background-color: white;
            border: 1px solid #ccc;
        }
    }
    #btn-new{
        width: 100px;
        background-color: #7dd87d;
        &:hover{
            background-color: white;
            border: 1px solid #7dd87d;
        }
    }
    #table-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 20px;
    }
`
const TableStyled = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
    border: 5px solid black;
    table-layout: fixed; /* Add this line to avoid horizontal scroll */
    thead{
        td{
            padding: 15px;
            text-align: left; 
            color: #33BECA;
        }
        @media (max-width: 600px) {
            td:nth-child(n+4) {
                display: none;
            }
        }
    }
    tbody{
        color: #444;
        tr{
            background-color: white;
        }
        tr:hover {
            background-color: #ccc;
        }
        td{
            text-align: left;
            padding: 15px 5px;
            border-bottom: 1px solid black;
            cursor: pointer;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            width: auto;
        }
        @media (max-width: 600px) {
            td:nth-child(n+4) {
                display: none;
            }
        }
    }

`
export default function CreateTable({ context, name }) {
    const { defaultValues, tableValues, data, collectionName, fields } = context;
    console.log(defaultValues)
    const headers = Object.keys(tableValues)
    const navigate = useNavigate();
    function handleUpdate(itemId) {
        navigate(`${itemId}`, { state: { fields, name, collectionName } });
    }
    function handleNewForm() {
        navigate(`new`, { state: { defaultValues, fields, name, collectionName } });
    }
    return (
        <TableContainer>
            <div id="table-header">
                <button id="btn-back" onClick={() => navigate(-1)}>Back</button>
                <h2>{name} List</h2>
                <button id="btn-new" onClick={() => handleNewForm()}>New</button>
            </div>
            <TableStyled>
                <thead>
                    <tr>
                        {headers.map((key, index) => (
                            <td key={index}>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.length > 0
                            ? data.map((item, index) => (
                                <tr key={index}>
                                    {headers.map((key, index) => (
                                        <td key={index} onClick={() => (handleUpdate(item.id))} style={key === 'color' ? { backgroundColor: item[key], color: "white" } : {}}>
                                            {Array.isArray(item[key])
                                                ? key === 'images'
                                                    ? item[key].map((item, index) => <img key={index} src={item} style={{ width: "50px", borderRadius: "10px", padding: "5px" }} />)
                                                    : <ul>{item[key].map((item, index) => <li key={index}>{item}</li>)}</ul>
                                                : (item[key])}
                                        </td>
                                    ))}
                                </tr>
                            ))
                            : <tr><td>No data to show...</td></tr>
                    }
                </tbody>
            </TableStyled>
        </TableContainer>
    )
}