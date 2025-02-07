export default function SelectField({
    label,
    name,
    list,
    listValues,
    value,
    onChange,
}) {
    return (
        <>
            <label>{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
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