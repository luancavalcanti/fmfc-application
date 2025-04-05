import { useEffect } from "react"
import useGetData from "../hooks/useGetData"
import useUpdateData from "../hooks/useUpdateData"
import useDeleteData from "../hooks/useDeleteData"
import SelectField from "./SelectField"
import TextField from "./TextField"
import MultipleSelectField from "./MultipleSelectField"
import TextareaField from "./TextareaField"
import FileField from "./FileField"
import { useNavigate } from "react-router-dom"
import { FormStyled } from "../styles/FormStyled"


export default function CreateUpdate({ id, viewUpdate, collectionName, fields, onUpdate }) {
    const { data } = useGetData(collectionName)
    const dataToUpdate = data.filter(item => item.id === id)[0]
    const { updateData, setUpdateData, handleUpdate, setImages } = useUpdateData(collectionName, dataToUpdate, viewUpdate, onUpdate)
    const { handleRemove } = useDeleteData(collectionName, viewUpdate, onUpdate)
    const navigate = useNavigate()

    useEffect(() => {
        if (dataToUpdate) {
            setUpdateData(dataToUpdate);
        }
    }, [dataToUpdate, setUpdateData]);

    function handleChange(e) {
        const { name, value } = e.target
        setUpdateData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const componentMap = {
        select: SelectField,
        multipleSelect: MultipleSelectField,
        text: TextField,
        date: TextField,
        email: TextField,
        password: TextField,
        color: TextField,
        tel: TextField,
        textarea: TextareaField,
        file: FileField
    }
    function handleRemoveFile(file) {
        const imagesFiltered = updateData.images.filter(image => image !== file)
        setUpdateData(prev => ({
            ...prev,
            images: imagesFiltered
        }))
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    return (
        <>
            <FormStyled>
                {updateData &&
                    fields.map((field, index) => {
                        const { label, type, name, list } = field
                        const Component = componentMap[type];
                        return (
                            <div id="fieldContainer" key={index}>
                                <Component
                                    label={label}
                                    type={type}
                                    name={name}
                                    list={list}
                                    setImages={setImages}
                                    value={type === 'file' ? '' : updateData[name]}
                                    onChange={handleChange}
                                />
                                {type === 'file' && updateData?.images.map((image, index) => (
                                    <div key={index}>
                                        <img src={image} style={{ width: "100px", borderRadius: "10px", padding: "5px" }} />
                                        <button onClick={() => handleRemoveFile(image)}>x</button>
                                    </div>
                                ))}
                            </div>
                        )
                    })
                }
                <div id="buttonContainer">
                    <button id="btn-update" onClick={handleUpdate}>Update</button>
                    <button id="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
                    <button id="btn-delete" onClick={() => {
                        if (window.confirm("Are you sure you want to delete this item?")) {
                            handleRemove(dataToUpdate.id);
                        }
                    }}>Delete</button>
                </div>
            </FormStyled>
        </>
    )
}