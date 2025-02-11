export default function TextareaField({ label, name, value, hidden, onChange }) {
    return (
        <>
            <label hidden={hidden}>{label}</label>
            <textarea name={name} value={value} onChange={onChange} rows="3" cols="" hidden={hidden} />
        </>
    )
}