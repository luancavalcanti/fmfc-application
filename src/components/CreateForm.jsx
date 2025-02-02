import useCreateData from "../hooks/useCreateData"
import SelectField from "./SelectField"
import TextField from "./TextField"

export default function CreateForm({ fields, defaultValues, collectionName, onCreate, cancel }) {

    const { handleInsert, setFormData, formData } = useCreateData(collectionName, defaultValues, onCreate)
    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <>
            <h1>Form</h1>
            {
                fields.map((field, index) => {
                    const { label, type, name, list, listValue, add } = field
                    if (list) {
                        return (
                            <div key={index}>
                                <SelectField
                                    label={label}
                                    name={name}
                                    list={list}
                                    value={formData[name]}
                                    listValues={listValue}
                                    onChange={handleChange}
                                    add={add}
                                />
                            </div>
                        )
                    } else {
                        return (
                            <div key={index}>
                                <TextField
                                    label={label}
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                />
                            </div>
                        )

                    }
                })
            }
            <button onClick={handleInsert}>Create</button>
            <button onClick={() => cancel(false)}>Cancel</button>
        </>

    )
}