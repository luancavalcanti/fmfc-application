export default function TextField({
    label,
    type,
    name,
    value,
    hidden,
    onChange
}) {
    return (
        <>
            <label hidden={hidden}>{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} hidden={hidden} />
        </>
    )
}