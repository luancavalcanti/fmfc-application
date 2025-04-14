import { addDoc, collection } from "firebase/firestore"
import { db, storage } from "../firebase-config"
import { useState } from "react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useNavigate } from "react-router-dom"


export default function useCreateData(collectionName, defaultValues, callback) {
    const [formData, setFormData] = useState(defaultValues)
    const [images, setImages] = useState(null)
    const time = new Date().toISOString()
    const navigate = useNavigate()
    async function handleCreate(back) {
        if (images?.length > 0) {
            const uploadPromises = images.map(async (image, index) => {
                const fileName = index + "_" + time.replace(/[^a-zA-Z0-9]/g, '') + "." + image.name.substring(image.name.lastIndexOf('.') + 1)
                const storageRef = ref(storage, fileName)
                await uploadBytes(storageRef, image)
                return await getDownloadURL(storageRef)
            })
            const imageUrls = await Promise.all(uploadPromises)
            const updatedFormData = {
                ...formData,
                images: imageUrls
            };
            setFormData(updatedFormData);
            await addDoc(collection(db, collectionName), updatedFormData)
        } else {
            await addDoc(collection(db, collectionName), formData);
        }

        setFormData(defaultValues)
        back && navigate(-1)
        callback && callback()
    }

    return {
        handleCreate,
        formData, setFormData,
        images, setImages,
    }
}