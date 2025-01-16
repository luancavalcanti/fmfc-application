export default function SelectInput(props) {
    const { label, list } = props
    return (
        <>
            <label>{label}</label>
            <select>
                {
                    list?.map((item, index) => {
                        return (
                            <option key={index} value={item}>{item}</option>
                        )
                    })
                }
            </select>
        </>
    )
}