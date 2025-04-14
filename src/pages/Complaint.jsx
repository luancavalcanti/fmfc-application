import { useLocation } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import useCreateData from "../hooks/useCreateData"
import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "../context/UserContext"
import styled from "styled-components"
import { LuImagePlus } from "react-icons/lu"
import { RiSendPlane2Line } from "react-icons/ri"
import SelectField from "../components/SelectField"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase-config"
import { BreadcrumbContext } from "../context/BreadcrumbContext"
import { AiTwotoneCloseCircle } from "react-icons/ai"

const ComplaintContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0;
    padding: 10px 10px;
    min-height: calc(100vh - 160px);
    color: #555;
    background-color: white;
    border-radius: 10px;
    gap:10px;
    box-sizing: border-box;

    @media (max-width: 1024px){
        margin: 0 100px;
    }
    @media (max-width: 768px){
        margin: 0 50px;
    }
    @media (max-width: 480px){
        margin: 0;
        border-radius: 0;
    }
    #title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        p{
            background-color: ${props => props.color}; 
            padding: 10px;
            border-radius: 20px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
            color:white;
            margin: 0px;
        }
    }

    #changeStatusContainer{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15px;
        select{
            padding: 10px;
            border-radius: 10px;
        }
        #btn-changeStatus{
            display: flex;
            align-items: center;
            background-color: #ccc;
            padding:10px;
            cursor: pointer;
            &:hover{
                background-color: #999;
            }
        }
    }

    #description, #images, #comments{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    #description{
        p{
            background-color: #eee;
            padding: 8px;
            margin: 0;
            border-radius: 10px;
            text-align: left;
            width: 100%;
            box-sizing: border-box;
        }
    }  

    #images{
        #imagesContainer{
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            background-color: #eee;
            border-radius: 10px;
            padding: 8px;
            width: 100%;
            box-sizing: border-box;
            img{
                height: auto;
                width: 80px;
                border-radius: 10px;
                padding: 5px;
            }
        }
        /* @media (max-width: 1024px) {
            #imagesContainer img {
                flex: 1 1 calc(25% - 10px);
                max-width: calc(25% - 10px);
            }
        }
        @media (max-width: 768px) {
            #imagesContainer img {
                flex: 1 1 calc(50% - 10px);
                max-width: calc(50% - 10px);
            }
        }
        @media (max-width: 480px) {
            #imagesContainer img {
                flex: 1 1 calc(50% - 10px);
                max-width: calc(50% - 10px);
            }
        } */
    }

    #comments{
        display: flex;
        flex-grow: 1;
        height: 100%;
        gap: 10px;
        label{
            margin-bottom: -10px;
        }
        #scrollContainer{
            overflow-y: auto;
            display: flex;
            flex-direction: column-reverse;
            flex-grow: 1;
            border-radius: 10px;
            width: 100%;
            max-height: 300px;
            #commentsContainer{
                display: flex;
                padding: 8px;
                flex-direction: column;
                justify-content: flex-end;
                flex-grow: 1;
                background-color: #eee;
                box-sizing: border-box;
                gap: 10px;
                #commentContainer{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    width: 100%;
                    #commentName{
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        border-radius: 10px;
                        #name{
                            margin: 0 5px;
                            font-size: 0.9em;
                        }
                        #comment{
                            background-color: #eee;
                            margin: 0;
                            padding: 10px 10px;
                            text-align: right;
                            border-radius: 10px;
                            min-width: 10vh;
                        }
                        #date{
                            margin: 0 5px;
                            font-size: 0.7em;
                            align-self: flex-end;
                        }
                        #commentImagesContainer{
                            display: flex;
                            flex-wrap: wrap;
                            img {
                                flex: 1 1 calc(50% - 10px);
                                width: 80px;
                                height: auto;
                                border-radius: 10px;
                                padding: 5px;
                            }
                        }
                    }
                }
            }
        }
        #commentInput{
            display: flex;
            flex-direction: row;
            align-self: flex-end;
            position: relative;
            width: 100%;
            height: 60px;
            #sending{
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(20px);
                height: 100%;
                width: 100%;
                border-radius: 10px;
                color: #555;
                z-index: 100;
            }
            button{
                    padding: 10px;
                    width: 4em;
                    background-color:rgb(116, 170, 116);
                    color: white;
                    margin: 0 0 0 6px;
                    align-items: center;
                }
            input[type="text"]{
                width: 100%;
                padding: 20px;
                font-size: 1em;
                background-color: #eee;
                border: none;
                border-radius: 10px 0 0 10px;
                color: #555;

                &:focus {
                    outline: none;
                    background-color: #eee;
                }
            }
            #uploadImagesContainer{
                position: absolute;
                display: flex;
                /* bottom: 10px; */
                right: 105px;
                box-sizing: border-box;
                padding: 2px;
                /* height: 60px; */
                gap: 5px;
                #imagePreviewContainer{
                    position: relative;
                    height: 54px;
                    img{
                        margin:0 ;
                        height: 100%;
                        border-radius: 10px; 
                    }
                    #btn-removeImage{
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        top: 0;
                        right: 0;
                        color: red;
                        font-size: 35px;
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                        border-radius: 10px;
                    }
                }
            }
        }

    }
`
const InputFile = styled.div`
    input[type="file"] {
        display: none;
    }

    label {
        display: flex;
        align-items: center;
        justify-content: center;
        /* padding: 10px 20px; */
        height: 100%;
        width: 40px;
        background-color:rgb(110, 152, 197);
        color: white;
        border-radius: 0 10px 10px 0;
        cursor: pointer;
        text-align: center;
    }
`
export default function Complaint() {
    const location = useLocation()
    const { complaint, complaintId, color, lastCrumbs } = location.state
    const { formData, handleCreate, setFormData, images, setImages } = useCreateData('comments')
    const { data: status } = useGetData('status')
    const { user, role } = useContext(UserContext)
    const { data: comments, getData: getComments } = useGetData('comments')
    const commentsFiltered = comments.filter(comment => comment.complaintID === complaintId).sort((a, b) => new Date(a.date_in) - new Date(b.date_in))
    const time = new Date().toISOString()
    const [newStatus, setNewStatus] = useState("")
    const [newColor, setNewColor] = useState(color)
    const [previewImages, setPreviewImages] = useState(null)
    const [complaintTemp, setComplaintTemp] = useState(complaint)
    const { setCrumbs } = useContext(BreadcrumbContext)
    const [isLoading, setIsLoading] = useState(false)
    const commentsContainerRef = useRef(null)
    const [loadingComments, setLoadingComments] = useState(true)
    const countImages = commentsFiltered.map(comment => comment.images).filter(image => image.length > 0)

    const complaintDefaultValues = {
        complaintID: complaintTemp.id,
        user: user.email,
        complaint: "",
        images: [],
        date_in: time,
    }

    useEffect(() => {
        setCrumbs([...lastCrumbs, "Complaint"])
        setFormData(complaintDefaultValues)

    }, [setFormData, setCrumbs, lastCrumbs])

    function handleChangeComment(e) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSend() {
        setIsLoading(true)
        try {
            const back = false
            await handleCreate(back)
            setFormData(complaintDefaultValues)
            setPreviewImages(null)
            await getComments()
        } catch (error) {
            console.log("Error to send the comment:", error)
        } finally {
            setIsLoading(false)
            setImages([])
            setPreviewImages([])
            setLoadingComments(true)
            document.getElementById('inputFile').value = null
        }
    }

    function handleImageChange(e) {
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.target.files)
        setImages(files)
        setPreviewImages(files.map(file => URL.createObjectURL((file))))
    }

    async function handleStatusChange(id, statusUpdated) {
        setNewColor(status.filter(status => status.name === statusUpdated)[0].color)
        setComplaintTemp(prev => ({
            ...prev,
            status: statusUpdated
        }))
        await updateDoc(doc(db, "complaints", id), {
            status: statusUpdated
        })

    }

    function removeInputImage(index) {
        if (images) {
            if (previewImages.length > 0) {
                setPreviewImages(previewImages.filter(image => image !== previewImages[index]))
                setImages(images.filter(image => image !== images[index]))
            } else {
                setPreviewImages([])
                setImages([])
            }
        }
    }

    function handleImageLoad() {
        setLoadingComments(false)
    }

    function formatDate(date) {
        const temp_date = date.split('T')[0].split('-')
        const temp_time = date.split('T')[1].split(':')
        const timeZone = new Date().getTimezoneOffset() / 60
        // const year = temp_date[0]
        const month = temp_date[1]
        const day = temp_date[2]
        const hours = temp_time[0] - timeZone
        const minutes = temp_time[1]
        return (`${month}.${day} - ${hours}:${minutes}`)
    }
    return (
        complaintTemp && <>
            <ComplaintContainer id="container" color={newColor}>
                <div id="title">
                    <h3>{complaintTemp.client}{' / '}{complaintTemp.service}</h3>
                    <p>{complaintTemp.status}</p>
                </div>
                <div id="status">
                    {role === "admin" && <div id="changeStatusContainer">
                        <SelectField
                            label="Status"
                            list={status.map(item => item.name)}
                            value={newStatus || complaintTemp.status}
                            onChange={(e) => setNewStatus(e.target.value)}
                        />
                        {newStatus && <button id="btn-changeStatus" onClick={() => handleStatusChange(complaintTemp.id, newStatus)}>Update Status</button>}
                    </div>}
                </div>
                <div id="description">
                    <label>Description</label>
                    <p>{complaintTemp.complaint}</p>
                </div>
                {complaintTemp.images.length > 0 &&
                    <div id="images">
                        <label>Images<br /></label>
                        <div id="imagesContainer">
                            {complaintTemp.images.map((image, index) => (
                                <img key={index} src={image} onLoad={handleImageLoad} />
                            ))}
                        </div>
                    </div>
                }
                <div id="comments">
                    <label>Comments{loadingComments && countImages.length > 0 && ' (Loading Images...)'}</label>
                    <div id="scrollContainer">
                        <div id="commentsContainer">
                            {commentsFiltered && commentsFiltered.map((comment, index) => (
                                <div id="commentContainer" ref={commentsContainerRef} key={index} style={comment.user === user.email ? { alignItems: "flex-end" } : { alignItems: "flex-start" }}>
                                    <div id="commentName" >


                                        <p
                                            id="name"
                                            style={comment.user === user.email
                                                ? { alignSelf: "flex-end" }
                                                : { alignSelf: "flex-start" }
                                            }
                                        >
                                            {comment.user.split('@')[0]}
                                        </p>
                                        {comment.complaint &&
                                            <p
                                                id="comment"
                                                style={comment.user === user.email
                                                    ? { backgroundColor: "#ADD8E6" }
                                                    : { backgroundColor: "#E9DCC9" }}
                                            >
                                                {comment.complaint}
                                            </p>
                                        }
                                        <div id="commentImagesContainer">
                                            {
                                                comment.images.length > 0 && comment.images.map((image, index) => (
                                                    <img key={index} src={image} onLoad={handleImageLoad} />
                                                ))
                                            }
                                        </div>
                                        <p id="date">{formatDate(comment.date_in)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id="commentInput">
                        <input type="text" onChange={handleChangeComment} value={formData?.complaint || ""} name="complaint" required></input>
                        <InputFile>
                            <label htmlFor="inputFile"><LuImagePlus /></label>
                            <input type="file" id="inputFile" onChange={handleImageChange} name="images" multiple />
                        </InputFile>
                        {isLoading && <div id="sending">Sending...</div>}
                        <button onClick={handleSend} disabled={formData?.complaint || images ? false : true}><RiSendPlane2Line /></button>
                        <div id="uploadImagesContainer">
                            {previewImages?.map((image, index) => (
                                <div id="imagePreviewContainer" key={index}>
                                    <img src={image} />
                                    <div onClick={() => removeInputImage(index)} id="btn-removeImage"><AiTwotoneCloseCircle /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ComplaintContainer>

        </>
    )
}