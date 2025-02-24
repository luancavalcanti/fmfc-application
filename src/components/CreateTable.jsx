import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    #btn-back{
        width: 100px;
        margin-left: 20px;
        margin-top: 10px;
    }
    #btn-new{
        align-self: flex-end;
        width: 100px;
        margin-right: 20px;
        background-color: aliceblue;
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
export default function CreateTable({ defaultValues, data, viewUpdate, id, setShowForm, showForm, name }) {
    console.log(showForm)
    const headers = Object.keys(defaultValues)
    const navigate = useNavigate();
    return (
        <TableContainer>
            {!showForm && <button id="btn-back" onClick={() => navigate(-1)}>Back</button>}
            <h2>{name} List</h2>
            {!showForm && <button id="btn-new" onClick={() => setShowForm(true)}>New</button>}
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
                                <tr key={index} style={id === item.id ? { backgroundColor: "#B3E588" } : {}}>
                                    {headers.map((key, index) => (
                                        <td key={index} onClick={() => (viewUpdate(item.id))} style={key === 'color' ? { backgroundColor: item[key], color: "white" } : {}}>
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