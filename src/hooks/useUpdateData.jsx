import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase-config"
import { useState } from "react"

export default function useUpdateData(collectionName, data, view, callback) {

    const [updateData, setUpdateData] = useState(data)

    async function handleUpdate() {
        const docRef = doc(db, collectionName, updateData.id)
        await updateDoc(docRef, updateData)
        view(false)
        callback && callback()
    }

    return {
        handleUpdate,
        setUpdateData,
        updateData,
    }
}