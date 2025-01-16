import useCRUD from "../hooks/useCRUD"
import TextInput from "./TextInput"

export default function DefaultCRUD(props) {
    const {
        title,
        formObject,
        collectionName,
        formDefault
    } = props

    const CRUD = useCRUD(collectionName, formDefault)

    const {
        handleForm,
        cancelEdit,
        handleEdit,
        handleRemove,
        handleNewForm,
        data,
        formData,
        setFormData,
        newForm,
        editing,
    } = CRUD
    console.log(formData)
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
                                            value={formData[name]}
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