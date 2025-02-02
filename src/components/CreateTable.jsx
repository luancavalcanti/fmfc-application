import { useState } from "react";
import useGetData from "../hooks/useGetData"
import CreateUpdate from "./CreateUpdate";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import CreateForm from "./CreateForm";

export default function CreateTable({ collectionName, defaultValues, fields }) {
    const { data, setData } = useGetData(collectionName)
    const headers = Object.keys(defaultValues);
    const [showEdit, setShowEdit] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [id, setId] = useState('')
    console.log('rendered')
    function handleView(id) {
        setShowEdit(true)
        setId(id)
    }

    function handleUpdate() {
        async function fetchData() {
            const querySnapshot = await getDocs(collection(db, collectionName))
            const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setData(dataList)
        }
        fetchData()
    }
    return (
        <>
            <br />
            <button onClick={() => setShowNew(!showNew)}>New</button>
            {showNew && <CreateForm
                fields={fields}
                defaultValues={defaultValues}
                collectionName={collectionName}
                onCreate={handleUpdate}
                cancel={setShowNew}
            />}
            <h1>Table</h1>
            <table>
                <thead>
                    <tr>
                        {headers.map((key, index) => (
                            <td key={index}>{key}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0
                            ? data.map((item, index) => (
                                <tr key={index}>
                                    {headers.map((key, index) => (
                                        <td key={index}>{item[key]}</td>
                                    ))}
                                    <td><button onClick={() => handleView(item.id)}>View</button></td>
                                </tr>
                            ))
                            : <tr><td>No data...</td></tr>
                    }
                </tbody>
            </table>
            {showEdit &&
                <CreateUpdate
                    id={id}
                    view={setShowEdit}
                    collectionName={collectionName}
                    fields={fields}
                    onUpdate={handleUpdate}
                />
            }
        </>

    )
}