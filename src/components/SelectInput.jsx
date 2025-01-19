import { useState } from "react";

export default function SelectInput(props) {
    const { label, name, list, onChange } = props

    const [selectedValue, setSelectedValue] = useState(""); // Estado do valor selecionado

    const handleChange = (event) => {
        const selected = event.target.value;

        if (selected !== "" && name === 'employees') {
            setSelectedValue(""); // Voltar para o valor padrão
        } else {
            setSelectedValue(selected)
        }
        onChange(event)
    };

    return (
        <>
            <label>{label}</label>
            <select
                name={name}
                value={selectedValue}
                onChange={handleChange}
            >
                <option value="" disabled>
                    Select...
                </option>
                {list.map((name, index) => (
                    <option key={index} value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </>
    );

}