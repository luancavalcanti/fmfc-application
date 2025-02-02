import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase-config"
import { useState } from "react"

export default function useInsertData(collectionName, defaultValues, callback) {

    const [formData, setFormData] = useState(defaultValues)

    async function handleInsert() {
        addDoc(collection(db, collectionName), formData)
        setFormData(defaultValues)
        callback && callback()
    }

    return {
        handleInsert,
        formData, setFormData,

    }
}