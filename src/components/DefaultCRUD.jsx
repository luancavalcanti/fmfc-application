import useCRUD from "../hooks/useCRUD"
import SelectInput from "./SelectInput"
import TextInput from "./TextInput"

export default function DefaultCRUD(props) {
    const {
        title,
        formObject,
        collectionName,
        formDefault,
        role
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

            {
                newForm && role === 'admin'(
                    <>
                        <button onClick={handleNewForm}>New {title}</button>
                        <h2>Employee Form</h2>
                        {
                            formObject.map((object, index) => {
                                const { label, type, list, name } = object

                                if (list?.length > 0) {
                                    return (
                                        <div key={index}>
                                            <SelectInput
                                                label={label}
                                                name={name}
                                                list={list}
                                                value={formData[name]}
                                                onChange={handleChangeInput}
                                            />
                                        </div>
                                    )
                                } else {
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
                                }
                            })
                        }
                        <div>
                            {
                                editing
                                    ? <button onClick={() => handleForm(collectionName)}>Editar</button>
                                    : <button onClick={() => handleForm(collectionName)}>Criar</button>
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
                                        const { type, name, list } = object
                                        if (list?.length > 0) {
                                            return (
                                                <td key={index}>
                                                    {item[name]}
                                                    {
                                                        editing && item.id === formData.id &&
                                                        <SelectInput name={name} list={list} value={formData[name]} onChange={handleChangeInput} />
                                                    }
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    {item[name]}
                                                    {
                                                        editing && item.id === formData.id &&
                                                        <TextInput type={type} name={name} value={formData[name]} onChange={handleChangeInput} />
                                                    }
                                                </td>
                                            )
                                        }
                                    })
                                }
                                <td>
                                    {
                                        editing
                                            ? (item.id === formData.id &&
                                                <>
                                                    <button onClick={() => handleForm(collectionName)}>Update</button>
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