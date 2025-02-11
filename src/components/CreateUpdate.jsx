import { useEffect } from "react"
import useGetData from "../hooks/useGetData"
import useUpdateData from "../hooks/useUpdateData"
import useDeleteData from "../hooks/useDeleteData"
import SelectField from "./SelectField"
import TextField from "./TextField"
import MultipleSelectField from "./MultipleSelectField"
import TextareaField from "./TextareaField"
import FileField from "./FileField"

export default function CreateUpdate({ id, viewUpdate, collectionName, fields, onUpdate }) {
    const { data } = useGetData(collectionName)
    const dataToUpdate = data.filter(item => item.id === id)[0]
    const { updateData, setUpdateData, handleUpdate, setImages } = useUpdateData(collectionName, dataToUpdate, viewUpdate, onUpdate)
    const { handleRemove } = useDeleteData(collectionName, viewUpdate, onUpdate)

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

    return (
        <>
            <h1>Edit</h1>
            {updateData &&
                fields.map((field, index) => {
                    const { label, type, name, list } = field
                    const Component = componentMap[type];
                    return <div key={index}>
                        <Component
                            label={label}
                            type={type}
                            name={name}
                            list={list}
                            setImages={setImages}
                            value={type === 'file' ? '' : updateData[name]}
                            onChange={handleChange}
                        // hidden={hidden}
                        />
                        {type === 'file' && updateData?.images.map((image, index) => (
                            <div key={index}>
                                <img src={image} style={{ width: "100px", borderRadius: "10px", padding: "5px" }} />
                                <button onClick={() => handleRemoveFile(image)}>x</button>
                            </div>
                        ))}
                    </div>

                })

                /* fields.map((field, index) => {
                    const { label, name, type, list, listValues, add } = field
                    if (list) {
                        return <div key={index}>
                            {
                                Array.isArray(updateData[name])
                                    ? (
                                        <div key={index}>
                                            <MultipleSelectField
                                                label={label}
                                                name={name + index}
                                                values={updateData[name]}
                                                list={list}
                                                listValues={listValues}
                                                onChange={handleChange}
                                                add={add}
                                            />
                                        </div>
                                    ) : (
                                        <SelectField
                                            label={label}
                                            name={name}
                                            list={list}
                                            value={updateData[name]}
                                            listValues={listValues}
                                            onChange={handleChange}
                                            add={add}
                                        />

                                    )
                            }
                        </div>

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
                }) */
            }
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => viewUpdate()}>Cancel</button>
            <button onClick={() => handleRemove(dataToUpdate.id)}>Delete</button>
        </>
    )
}