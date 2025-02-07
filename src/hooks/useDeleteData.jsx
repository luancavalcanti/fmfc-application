import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase-config"

export default function useDeleteData(collectionName, setView, callback) {
    function handleRemove(id) {
        deleteDoc(doc(db, collectionName, id))
        setView(false)
        callback && callback()
    }
    return {
        handleRemove,
    }
}