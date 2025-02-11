import { useLocation } from "react-router-dom"
import useGetData from "../hooks/useGetData"
import useCreateData from "../hooks/useCreateData"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import FileField from "../components/FileField"

export default function Complaint() {
    const location = useLocation()
    const { complaint } = location.state
    const { formData, handleCreate, setFormData, images, setImages } = useCreateData('comments')
    const { user } = useContext(UserContext)
    const { data, getData } = useGetData('comments')
    const commentsFiltered = data.filter(comment => comment.complaintID === complaint.id).sort((a, b) => new Date(a.date_in) - new Date(b.date_in))
    const time = new Date().toISOString()

    const complaintDefaultValues = {
        complaintID: complaint.id,
        user: user.email,
        complaint: "",
        images: [],
        date_in: time,
    }

    const tempStyle = {
        border: '1px solid black',
        padding: '10px',
        margin: '10px',
        backgroundColor: "grey",
        borderRadius: "10px"
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
        getData()
    }

    console.log(formData)
    return (
        <div style={tempStyle}>
            <h1>{complaint.contract.split(' - ')[0]}</h1>
            <h2>{complaint.contract.split(' - ')[1]}</h2>
            <p>{complaint.complaint}</p>
            {complaint.images && complaint.images.map((image, index) => (
                <img key={index} src={image} style={{ width: "200px", borderRadius: "10px", padding: "5px" }} />
            ))}
            <h2>Comments</h2>
            {commentsFiltered && commentsFiltered.map((comment, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: "center" }}>
                    <p>{comment.user.split('@')[0]}:</p>
                    <p>{comment.complaint}</p>
                </div>
            ))}
            <textarea onChange={handleChangeComment} value={formData?.complaint} name="complaint" required></textarea>
            <br />
            <FileField />
            <br />
            <button onClick={handleSend} disabled={formData?.complaint ? false : true}>send</button>
        </div>
    )
}