import { collection, getDocs } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { db } from "../firebase-config"

export default function useGetData(collectionName) {
    const [data, setData] = useState([])

    const getData = useCallback(async () => {
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
    }, [collectionName])

    useEffect(() => {
        getData()
    }, [getData])

    return {
        data, setData,
        getData,
    }
}