import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase-config"
import { useNavigate } from "react-router-dom"

export default function useDeleteData(collectionName, callback) {
    const navigate = useNavigate()
    function handleRemove(id) {
        deleteDoc(doc(db, collectionName, id))
        navigate(-1)
        callback && callback()
    }
    return {
        handleRemove,
    }
}