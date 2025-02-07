import { useState } from "react"

export default function MultipleSelectField({
    label,
    name,
    values,
    list,
    onChange,
}) {
    const [arrayValues, setArrayValues] = useState(values || [""])

    function handleChange(e, index) {
        const { name, value } = e.target
        arrayValues[index] = value
        onChange({ target: { name: name, value: arrayValues } })

    }
    function handleAddSelect() {
        setArrayValues([...arrayValues, ""])
    }

    function handleRemoveSelect(index) {
        const newArrayValues = arrayValues.filter((_, i) => i !== index);
        setArrayValues(newArrayValues)
    }

    return (
        <>
            {arrayValues.map((_, index) => (
                <div key={index}>
                    <label>{label}</label>
                    <select
                        name={name}
                        value={arrayValues[index]}
                        onChange={(e) => handleChange(e, index)}
                    >
                        <option value="" disabled>Select... </option>
                        {list.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {arrayValues.length === index + 1
                        ? <button onClick={handleAddSelect}>+</button>
                        : <button onClick={() => handleRemoveSelect(index)}>-</button>
                    }
                    <br />
                </div>
            ))
            }

        </>
    )
}