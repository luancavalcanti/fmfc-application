import { createContext, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

export const CRUDContext = createContext()

export function CRUDProvider({ children, collectionName, formDefault }) {

    const [data, setData] = useState([])
    const [formData, setFormData] = useState(formDefault)
    const [editing, setEditing] = useState(false)
    const [newForm, setNewForm] = useState(false)

    useEffect(() => {
        getData(collectionName)
    }, [collectionName])

    async function getData(collectionName) {
        const docRef = collection(db, collectionName)
        const dataSnapshot = await getDocs(docRef)
        const dataDB = dataSnapshot.docs.map(doc => (
            {
                id: doc.id,
                ...doc.data()
            }
        ))
        setData(dataDB)
    }
    async function handleForm(e, collectionName) {
        e.preventDefault()
        if (editing) {
            const docRef = doc(db, collectionName, formData.id)
            await updateDoc(docRef, formData)
            await getData(collectionName)
            setFormData(formDefault)
            setEditing(false)
            console.log("Editado com suceso!")
        } else {
            try {
                console.log(collectionName, formData)
                const docRef = await addDoc(collection(db, collectionName), formData)
                console.log("Documento criado com id: ", docRef.id)
                await getData(collectionName)
                setFormData(formDefault)
                setNewForm(false)
            } catch (error) {
                console.error("Erro ao adicionar no banco: ", error)
            }
        }
    }

    function cancelEdit() {
        setFormData(formDefault)
        setEditing(false)
    }

    function handleEdit(data) {
        const editValues = {
            ...data
        }
        setFormData(editValues)
        setEditing(true)
    }

    function handleRemove(collectionName, id) {
        deleteDoc(doc(db, collectionName, id))
        getData(collectionName)
        console.log('Removido com sucesso!')
    }

    function handleNewForm() {
        setNewForm(!newForm)
    }


    return (
        <CRUDContext.Provider value={{
            handleForm,
            cancelEdit,
            handleEdit,
            handleRemove,
            handleNewForm,
            data,
            formData, setFormData,
            newForm,
            editing,
            collectionName,

        }}>
            {children}
        </CRUDContext.Provider>
    )
}