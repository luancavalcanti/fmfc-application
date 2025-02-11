export default function SelectField({
    label,
    name,
    list,
    listValues,
    value,
    hidden,
    onChange,
}) {
    return (
        <>
            <label hidden={hidden}>{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                hidden={hidden}
            >
                <option value="" disabled>Select... </option>
                {list.map((option, index) => (
                    <option key={index} value={listValues ? listValues[index] : option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    )
}