import { collection, getDocs } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { db } from "../firebase-config"

export default function useGetData(collectionName) {
    const [data, setData] = useState([])

    useEffect(() => {
        getData(collectionName)
    }, [collectionName])

    const getData = useCallback(async (collectionName) => {
        try {
            const docRef = collection(db, collectionName)
            const dataSnapshot = await getDocs(docRef)
            const dataDB = dataSnapshot.docs.map(doc => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ))
            setData(dataDB)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return {
        data, setData,
        getData,
    }
}