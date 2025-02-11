import { doc, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase-config"
import { useState } from "react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export default function useUpdateData(collectionName, data, setView, callback) {

    const [updateData, setUpdateData] = useState(data)
    const [images, setImages] = useState(null)
    const time = new Date().toISOString()

    async function handleUpdate() {
        const docRef = doc(db, collectionName, updateData.id)
        if (images?.length > 0) {
            const uploadPromises = images.map(async (image, index) => {
                const fileName = index + "_" + time.replace(/[^a-zA-Z0-9]/g, '') + "." + image.name.substring(image.name.lastIndexOf('.') + 1)
                const storageRef = ref(storage, fileName)
                await uploadBytes(storageRef, image)
                return await getDownloadURL(storageRef)
            })
            const imageUrls = await Promise.all(uploadPromises)
            const updatedData = {
                ...updateData,
                images: [...(updateData.images || []), ...imageUrls]
            };
            setUpdateData(updatedData);
            await updateDoc(docRef, updatedData)
        } else {
            await updateDoc(docRef, updateData)
        }
        setView(false)
        callback && callback()
    }

    return {
        handleUpdate,
        updateData, setUpdateData,
        images, setImages
    }
}