export default function TextField({
    label,
    type,
    name,
    value,
    hidden,
    placeholder,
    onChange
}) {
    return (
        <>
            <label hidden={hidden}>{label}</label>
            <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} hidden={hidden} />
        </>
    )
}