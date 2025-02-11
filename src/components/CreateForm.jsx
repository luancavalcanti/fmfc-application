import useCreateData from "../hooks/useCreateData"
import FileField from "./FileField"
import MultipleSelectField from "./MultipleSelectField"
import SelectField from "./SelectField"
import TextareaField from "./TextareaField"
import TextField from "./TextField"

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
        textarea: TextareaField,
        file: FileField
    };

    return (
        <>
            <h1>Form</h1>
            {
                fields.map((field, index) => {
                    const { label, type, name, list, hidden } = field
                    const Component = componentMap[type];
                    return (
                        <div key={index}>
                            <Component
                                label={label}
                                type={type}
                                name={name}
                                list={list}
                                values={formData[name]}
                                onChange={handleChange}
                                setImages={setImages}
                                hidden={hidden}
                            />
                        </div>
                    )
                })
            }
            <button onClick={() => handleCreate(viewUpdate)}>Create</button>
            <button onClick={() => viewUpdate()}>Cancel</button>
        </>

    )
}