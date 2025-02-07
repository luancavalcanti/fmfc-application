export default function TextField({
    label,
    type,
    name,
    value,
    onChange
}) {
    return (
        <>
            <label>{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} />
        </>
    )
}