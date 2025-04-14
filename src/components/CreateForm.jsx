import useCreateData from "../hooks/useCreateData"
import FileField from "./FileField"
import MultipleSelectField from "./MultipleSelectField"
import SelectField from "./SelectField"
import TextareaField from "./TextareaField"
import TextField from "./TextField"
import { useNavigate } from "react-router-dom"
import { FormStyled } from "../styles/FormStyled"
import { useContext, useState } from "react"
import { ComplaintsContext } from "../context/ComplaintsContext"

export default function CreateForm({ fields, defaultValues, collectionName, onCreate }) {
    const navigate = useNavigate()
    const { getDependence } = useContext(ComplaintsContext)
    const { handleCreate, setFormData, formData, setImages } = useCreateData(collectionName, defaultValues, onCreate)
    const serviceField = (fields.find(field => field.name === "service"))
    const [updateFields, setUpdateFields] = useState(fields)
    if (defaultValues.service) {
        serviceField.list = [defaultValues.service]
    }
    function handleChange(e, dependence) {
        const { name, value } = e.target
        if (dependence) {
            const service = getDependence(value)
            serviceField.list = service
            setUpdateFields(prev =>
                prev.map(field =>
                    field.name === "service" ? { ...field, list: service } : field
                )
            )
        }
        setFormData(prev => ({
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
    };

    return (
        <>
            <FormStyled>
                {
                    updateFields.map((field, index) => {
                        const { label, type, name, list, hidden, dependence } = field
                        const Component = componentMap[type];

                        return (
                            <div id="fieldContainer" key={index}>
                                <Component
                                    label={label}
                                    type={type}
                                    name={name}
                                    list={list}
                                    value={formData[name]}
                                    onChange={(e) => handleChange(e, dependence)}
                                    setImages={setImages}
                                    hidden={hidden}
                                />
                            </div>
                        )
                    })
                }
                <div id="buttonContainer">
                    <button id="btn-create" onClick={() => handleCreate(true)}>Create</button>
                    <button id="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </FormStyled>
        </>

    )
}