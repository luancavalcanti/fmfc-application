import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase-config"

export default function useDeleteData(collectionName, view, callback) {
    function handleRemove(id) {
        deleteDoc(doc(db, collectionName, id))
        view(false)
        callback && callback()
    }
    return {
        handleRemove,
    }
}