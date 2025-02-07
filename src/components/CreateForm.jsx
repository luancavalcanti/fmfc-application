import useCreateData from "../hooks/useCreateData"
import MultipleSelectField from "./MultipleSelectField"
import SelectField from "./SelectField"
import TextField from "./TextField"

export default function CreateForm({ fields, defaultValues, collectionName, onCreate, viewUpdate }) {

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
                            !add
                                ? (<div key={index}>
                                    <SelectField
                                        label={label}
                                        name={name}
                                        list={list}
                                        value={formData[name]}
                                        listValues={listValue}
                                        onChange={handleChange}
                                    />
                                </div>)
                                : (<div key={index}>
                                    <MultipleSelectField
                                        label={label}
                                        name={name}
                                        list={list}
                                        value={formData[name]}
                                        listValues={listValue}
                                        onChange={handleChange}
                                    />
                                </div>)
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
            <button onClick={() => viewUpdate()}>Cancel</button>
        </>

    )
}