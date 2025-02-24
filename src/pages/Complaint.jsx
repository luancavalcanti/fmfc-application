import { useLocation, useNavigate } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import useCreateData from "../hooks/useCreateData"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import styled from "styled-components"
import { LuImagePlus } from "react-icons/lu"
import { RiSendPlane2Line } from "react-icons/ri"
import SelectField from "../components/SelectField"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase-config"
import { TbRefresh } from "react-icons/tb"

const ComplaintContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    /* margin: 0 10px; */
    
    #btn-back{
        width: 100px;
        margin-left: 20px;
        margin-top: 10px;
    }

    #title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        p{
            background-color: ${props => props.color}; 
            padding: 10px;
            border-radius: 20px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
            color:white;
        }
    }
    #body {
        color: #555;
        display: flex;
        flex-direction: column;
        background-color: #ecf0f1;

        #description, #images, #comments{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            /* margin: 0 10px 10px 10px; */
            padding: 10px 10px;
        }

        #imagesContainer{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            background-color: #d5dbdb;
            border-radius: 10px;
            padding: 8px;
            img{
                flex: 1 1 calc(16.66% - 10px);
                max-width: calc(16.66% - 10px);
                height: auto;
                border-radius: 10px;
                padding: 5px;
            }
        }

        #changeStatusContainer{
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 10px 0 0 10px;
            select{
                padding: 10px;
                border-radius: 10px;
                margin:0 10px
            }
            button{
                display: flex;
                align-items: center;
                background-color: #ccc;
                color: white;
                cursor: pointer;
                &:hover{
                    background-color: #999;
                }
            }
        }

        @media (max-width: 1024px) {
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
        }

        #description{
            p{
                background-color: #d5dbdb;
                padding: 8px;
                margin: 0;
                border-radius: 10px;
                text-align: left;
                width: 100%;
                box-sizing: border-box;
            }
        }

        #commentsContainer{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            background-color: #d5dbdb;
            border-radius: 10px;
            /* padding: 8px; */
            box-sizing: border-box;

            #commentContainer{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                width: 100%;

                #commentName{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 4px;
                    margin: 2px;
                    border-radius: 10px;

                    #comment{
                        background-color: #d5dbdb;
                        margin: 0;
                        padding: 5px 10px;
                        border-radius: 10px;
                        
                    }
                    #commentImagesContainer{
                        display: flex;
                        flex-wrap: wrap;
                        img {
                            flex: 1 1 calc(50% - 10px);
                            /* max-width: calc(50% - 10px); */
                            width: 130px;
                            height: auto;
                            border-radius: 10px;
                            padding: 5px;
                        }
                    }
                }
            }
        }
        #commentInput{
            display: flex;
            flex-direction: row;
            width: 100%;
            padding: 10px 0;
            button{
                    padding: 10px;
                    width: 4em;
                    background-color:rgb(116, 170, 116);
                    margin: 0 0 0 6px;
                    align-items: center;
                }
            input[type="text"]{
                width: 100%;
                padding: 20px;
                font-size: 1em;
                background-color: #d5dbdb;
                border: none;
                border-radius: 10px 0 0 10px;
                color: #555;
                &:focus {
                    outline: none;
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
    const { complaintView, complaintId } = location.state
    const { data: complaints, getData: getComplaints } = useGetData('complaints')
    const complaintFiltered = complaints.filter(complaint => complaint.id === complaintId)[0]
    const navigate = useNavigate()
    const { formData, handleCreate, setFormData, images, setImages } = useCreateData('comments')
    const [previewImages, setPreviewImages] = useState(null)
    const { data: status } = useGetData('status')
    const statusColor = status.filter(item => item.name === complaintFiltered.status)[0]
    const [newStatus, setNewStatus] = useState("")
    const statusList = status.map(item => item.name)
    const { user } = useContext(UserContext)
    const { data: userPermissions } = useGetData('userPermissions')
    const permission = userPermissions.filter(permission => permission.email === user.email)[0]
    const { data: comments, getData: getComments } = useGetData('comments')
    const commentsFiltered = comments.filter(comment => comment.complaintID === complaintId).sort((a, b) => new Date(a.date_in) - new Date(b.date_in))
    const time = new Date().toISOString()
    const complaintDefaultValues = {
        complaintID: complaintView.id,
        user: user.email,
        complaint: "",
        images: [],
        date_in: time,

    }
    useEffect(() => {
        setFormData(complaintDefaultValues)
    }, [])

    function handleChangeComment(e) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSend() {
        await handleCreate()
        setFormData(complaintDefaultValues)
        setPreviewImages(null)
        getComments()
    }

    function handleImageChange(e) {
        const files = Array.from(e.target.files)
        setImages(files)
        setPreviewImages(files.map(file => URL.createObjectURL((file))))
    };
    async function handleStatusChange(id) {
        await updateDoc(doc(db, "complaints", id), {
            status: newStatus
        })
        getComplaints()
    }
    return (
        complaintFiltered && <>
            <ComplaintContainer color={statusColor?.color}>
                <button id="btn-back" onClick={() => navigate(-1)}>Back</button>
                <h2>{complaintFiltered.contract.split(' - ')[0]}</h2>
                <div id="title">
                    <h3>{complaintFiltered.contract.split(' - ')[1]}</h3>
                    <p>{complaintFiltered.status}</p>
                </div>
                <div id="body">
                    {permission?.role === "admin" && <div id="changeStatusContainer">
                        <SelectField
                            label="Status"
                            list={statusList}
                            value={newStatus ? newStatus : complaintFiltered.status}
                            onChange={(e) => setNewStatus(e.target.value)}

                        />
                        <button onClick={() => handleStatusChange(complaintFiltered.id)}><TbRefresh /> Update</button>
                    </div>}
                    <div id="description">
                        <label>Description</label>
                        <p>{complaintFiltered.complaint}</p>
                    </div>
                    <div id="images">
                        {complaintFiltered.images.length > 0 && <label>Images<br /></label>}
                        <div id="imagesContainer">
                            {complaintFiltered.images.length > 0 && complaintFiltered.images.map((image, index) => (
                                <img key={index} src={image} />
                            ))}
                        </div>
                    </div>
                    <div id="comments">
                        <label>Comments</label>
                        <div id="commentsContainer">
                            {commentsFiltered && commentsFiltered.map((comment, index) => (
                                <div id="commentContainer" key={index} style={comment.user === user.email ? { alignItems: "flex-end" } : { alignItems: "flex-start" }}>
                                    <div id="commentName" style={comment.user === user.email ? { backgroundColor: "#7fb3d5" } : { backgroundColor: "#b2babb" }}><strong>{comment.user.split('@')[0]}</strong>
                                        {comment.complaint && <p id="comment">{comment.complaint}</p>}
                                        <div id="commentImagesContainer">
                                            {
                                                comment.images.length > 0 && comment.images.map((image, index) => (
                                                    <img key={index} src={image} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div id="commentInput">
                            <input type="text" onChange={handleChangeComment} value={formData?.complaint} name="complaint" required></input>
                            <InputFile>
                                <label htmlFor="inputFile"><LuImagePlus /></label>
                                <input type="file" id="inputFile" onChange={handleImageChange} name="images" multiple />
                            </InputFile>

                            <button onClick={handleSend} disabled={formData?.complaint || images ? false : true}><RiSendPlane2Line /></button>
                        </div>
                        <div>
                            {previewImages?.map((image, index) => (<img key={index} src={image} style={{ width: "130px", borderRadius: "10px", padding: "5px" }} />))}
                        </div>
                    </div>
                </div>
            </ComplaintContainer>

        </>
    )
}