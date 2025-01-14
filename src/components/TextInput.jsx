/* eslint-disable react/prop-types */
export default function TextInput(props) {
    const { label, type, name, value, onChange } = props
    return (
        <>
            <label>{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} />
        </>
    )
}