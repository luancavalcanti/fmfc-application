import { useEffect } from "react"
import useGetData from "../hooks/useGetData"
import useUpdateData from "../hooks/useUpdateData"
import useDeleteData from "../hooks/useDeleteData"
import SelectField from "./SelectField"
import TextField from "./TextField"

export default function CreateUpdate({ id, view, collectionName, fields, onUpdate }) {
    const { data } = useGetData(collectionName)
    const dataToUpdate = data.filter(item => item.id === id)[0]
    const { updateData, setUpdateData, handleUpdate } = useUpdateData(collectionName, dataToUpdate, view, onUpdate)
    const { handleRemove } = useDeleteData(collectionName, view, onUpdate)

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

    return (
        <>
            <h1>Edit</h1>
            {
                updateData &&
                fields.map((field, index) => {
                    const { label, name, type, list, listValues, add } = field
                    if (list) {
                        return (
                            <div key={index}>
                                <SelectField
                                    label={label}
                                    name={name}
                                    list={list}
                                    value={updateData[name]}
                                    listValues={listValues}
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
                                    value={updateData[name]}
                                    onChange={handleChange}
                                />
                            </div>
                        )
                    }
                })
            }
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => view(false)}>Cancel</button>
            <button onClick={() => handleRemove(dataToUpdate.id)}>Delete</button>
        </>
    )
}