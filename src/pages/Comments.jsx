import { useContext, useEffect, useState } from "react";
import useCRUD from "../hooks/useCRUD";
import { UserContext } from "../context/UserContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase-config";

export default function Comments({ contractID }) {
    const [images, setImages] = useState(null);
    const [previewImages, setPreviewImages] = useState(null)
    const [showProgressBar, setShowProgressBar] = useState(false)
    const time = new Date().toISOString()
    const { user } = useContext(UserContext)
    const collectionName = 'comments'
    const formDefault = {
        contractID: contractID,
        user: user.email,
        date: time,
        comment: "",
        images: []
    }
    console.log(formDefault)
    const CRUD = useCRUD(collectionName, formDefault)
    const { formData, setFormData, data, handleForm } = CRUD

    useEffect(() => {
        if (formData.images.length > 0) {
            setShowProgressBar(false)
            handleForm(collectionName);
            setFormData(formDefault)
            setPreviewImages([])
        }
    }, [formData.images]);

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
            contractID: comment.contractID,
            user: comment.user,
            comment: comment.comment,
            images: comment.images
        }
    ))
    const commentsListFiltered = commentsList.filter(comment => comment.contractID === contractID)
    function handleImageChange(e) {
        const files = Array.from(e.target.files)
        setImages(files)
        setPreviewImages(files.map(file => URL.createObjectURL((file))))
    };


    async function handleSubmit() {
        if (images?.length > 0) {
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
            setFormData(prevState => ({
                ...prevState,
            }))
            handleForm(collectionName)
        }

    }


    return (
        contractID &&
        <>
            <h1>Comments</h1>
            <h2>Comments List</h2>
            {
                commentsListFiltered.map((comment, index) => (
                    <div key={index}>
                        <h3>{comment.user.split("@", 1)}: </h3>
                        <p>{comment.comment}</p>
                        {comment.images?.map((image, index) => (
                            <img key={index} src={image} alt="Image" style={{ width: "300px", borderRadius: "20px", padding: "5px" }} />
                        ))}
                    </div>
                ))
            }
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


        </>
    )
}