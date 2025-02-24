import styled from "styled-components"
import useCreateData from "../hooks/useCreateData"
import FileField from "./FileField"
import MultipleSelectField from "./MultipleSelectField"
import SelectField from "./SelectField"
import TextareaField from "./TextareaField"
import TextField from "./TextField"

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #33BECA;
    padding: 20px;
    border-radius: 10px;
    border: 5px solid rgb(136, 173, 229);
    #fieldContainer{
        display: flex;
        flex-direction: column;
        
        label{
            align-self: flex-start;
        }
        input, select{
            background-color: aliceblue;
            color: #555;
            padding: 10px;
            border-radius: 10px;
            border:none;
            &:focus {
                    outline: none;
                }
        }
    }
    #buttonContainer{
        margin-top: 20px;
        #btn-create{
            background-color: #B3E588;
        }
    }

`
export default function CreateForm({ fields, defaultValues, collectionName, onCreate, viewUpdate }) {

    const { handleCreate, setFormData, formData, setImages } = useCreateData(collectionName, defaultValues, onCreate)

    function handleChange(e) {
        const { name, value } = e.target
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
            <h1>Form</h1>
            <FormContainer>
                {
                    fields.map((field, index) => {
                        const { label, type, name, list, hidden } = field
                        const Component = componentMap[type];
                        return (
                            <div id="fieldContainer" key={index}>
                                <Component
                                    label={label}
                                    type={type}
                                    name={name}
                                    list={list}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    setImages={setImages}
                                    hidden={hidden}
                                />
                            </div>
                        )
                    })
                }
                <div id="buttonContainer">
                    <button id="btn-create" onClick={() => handleCreate(viewUpdate)}>Create</button>
                    <button id="btn-cancel" onClick={() => viewUpdate()}>Cancel</button>
                </div>
            </FormContainer>
        </>

    )
}