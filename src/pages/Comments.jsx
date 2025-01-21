import { useContext, useEffect, useState } from "react";
import useCRUD from "../hooks/useCRUD";
import { UserContext } from "../context/UserContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase-config";

export default function Comments() {
    const [images, setImages] = useState(null);
    const [previewImages, setPreviewImages] = useState(null)
    const [showProgressBar, setShowProgressBar] = useState(false)
    const time = new Date().toISOString()
    const { user } = useContext(UserContext)
    const collectionName = 'comments'
    const formDefault = {
        contractID: "",
        user: user.email,
        date: time,
        comment: "",
        images: []
    }

    const CRUD = useCRUD(collectionName, formDefault)
    const { formData, setFormData, data, handleForm } = CRUD
    const contractsList = useCRUD('contract')
    const list = contractsList.data?.map(contract => (
        {
            id: contract.id,
            client: contract.client,
            service: contract.service,
        }
    )
    )

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const comments = data.sort((a, b) => new Date(a.date) - new Date(b.date)) //Order comments by date
    const commentsList = comments.map(comment => (
        {
            user: comment.user,
            comment: comment.comment,
            images: comment.images
        }
    ))

    function handleImageChange(e) {
        const files = Array.from(e.target.files)
        setImages(files)
        setPreviewImages(files.map(file => URL.createObjectURL((file))))
    };


    async function handleSubmit() {
        if (images.length > 0) {
            setShowProgressBar(true)
            const uploadPromises = images.map(async (image, index) => {
                const fileName = index + "_" + time.replace(/[^a-zA-Z0-9]/g, '') + "." + image.name.substring(image.name.lastIndexOf('.') + 1)
                const storageRef = ref(storage, fileName)
                await uploadBytes(storageRef, image)
                return await getDownloadURL(storageRef)

            })
            const imageUrls = await Promise.all(uploadPromises)
            setFormData(prevState => ({
                ...prevState,
                images: imageUrls
            }))
        } else {
            handleForm(collectionName)
        }

    }
    useEffect(() => {
        if (formData.images.length > 0) {
            setShowProgressBar(false)
            handleForm(collectionName);
            setFormData(formDefault)
            setPreviewImages([])
        }
    }, [formData.images]);

    return (
        <>
            <h1>Comments</h1>
            <label>Contract</label>
            <select defaultValue={formData.contractID} onChange={handleChange} name="contractID">
                <option value="" disabled>Select...</option>
                {list.map((item, index) => (
                    <option value={item.id} key={index}>{item.client + " - " + item.service}</option>
                ))}
            </select>
            <br />
            <label>Comment</label>
            <textarea onChange={handleChange} name="comment" value={formData.comment}></textarea>
            <br />
            <label>Image(s)</label>
            <input type="file" onChange={handleImageChange} multiple />
            <br />
            {previewImages?.map((image, index) => (<img key={index} src={image} style={{ width: "150px", borderRadius: "10px", padding: "5px" }} />))}
            <br />
            {showProgressBar && <progress value={null} />}
            <br />
            <button onClick={handleSubmit}>Add Comment</button>
            <h2>Comments List</h2>
            {
                commentsList.map((comment, index) => (
                    <div key={index}>
                        <h3>{comment.user.split("@", 1)}: </h3>
                        <p>{comment.comment}</p>
                        {comment.images?.map((image, index) => (
                            <img key={index} src={image} alt="Image" style={{ width: "300px", borderRadius: "20px", padding: "5px" }} />
                        ))}
                    </div>
                ))
            }

        </>
    )
}