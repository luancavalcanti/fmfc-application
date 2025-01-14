import { useContext } from "react"
import TextInput from "./TextInput"
import { CRUDContext } from "../context/CURDContext"

export default function DefaultCRUD(props) {
    const {
        title,
        formObject,
        formData, setFormData,
    } = props

    const {
        handleNewForm,
        newForm,
        editing,
        handleForm,
        data,
        cancelEdit,
        handleEdit,
        handleRemove,
        collectionName
    } = useContext(CRUDContext)

    function handleChangeInput(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <>
            <h1>{title}</h1>
            <button onClick={handleNewForm}>New {title}</button>
            {
                newForm && (
                    <>
                        <h2>Employee Form</h2>
                        {
                            formObject.map((object, index) => {
                                const { label, type, name } = object
                                return (
                                    <div key={index}>
                                        <TextInput
                                            label={label}
                                            type={type}
                                            name={name}
                                            value={formData}
                                            onChange={handleChangeInput}
                                        />
                                    </div>
                                )
                            })
                        }
                        <div>
                            {
                                editing
                                    ? <button onClick={(e) => handleForm(e, collectionName)}>Editar</button>
                                    : <button onClick={(e) => handleForm(e, collectionName)}>Criar</button>
                            }
                        </div>
                    </>
                )
            }
            <h2>{title} List</h2>
            <table>
                <thead>
                    <tr>
                        {
                            formObject.map((object, index) => <th key={index}>{object.label}</th>)
                        }
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item, index) => (
                            <tr key={index}>
                                {
                                    formObject.map((object, index) => {
                                        const { type, name, value, onChange } = object
                                        return (
                                            <td key={index}>
                                                {item[name]}
                                                {
                                                    editing && item.id === formData.id &&
                                                    <input type={type} name={name} value={value} onChange={onChange} />
                                                }
                                            </td>
                                        )
                                    })
                                }
                                <td>
                                    {
                                        editing
                                            ? (item.id === formData.id &&
                                                <>
                                                    <button onClick={(e) => handleForm(e, collectionName)}>Update</button>
                                                    <button onClick={() => cancelEdit()}>Cancel</button>
                                                </>
                                            )
                                            : (
                                                <>
                                                    <button onClick={() => handleEdit(item)}>Edit</button>
                                                    <button onClick={() => handleRemove(collectionName, item.id)}>Remove</button>
                                                </>
                                            )
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>

    )
}