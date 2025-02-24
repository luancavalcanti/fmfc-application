import { useState } from "react";
import styled from "styled-components";

const InputFile = styled.div`
    input[type="file"] {
        display: none;
    }

    label {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        height: 100%;
        width: 40px;
        background-color:rgb(110, 152, 197);
        color: white;
        border-radius: 10px;
        cursor: pointer;
        text-align: center;
    }
`

export default function FileField({
    label,
    name,
    // value,
    setImages,
    // onChange,
    hidden
}) {
    // const [images, setImages] = useState(null);
    const [previewImages, setPreviewImages] = useState(null)

    function handleImageChange(e) {
        const files = Array.from(e.target.files)
        setImages(files)
        setPreviewImages(files.map(file => URL.createObjectURL((file))))
        // onChange()
    };

    return (
        <InputFile>
            <label htmlFor="inputFile" hidden={hidden}>{label}</label>
            <input id="inputFile" type="file" onChange={handleImageChange} name={name} multiple hidden={hidden} />
            <br />
            {previewImages?.map((image, index) => (<img key={index} src={image} style={{ width: "150px", borderRadius: "10px", padding: "5px" }} />))}
        </InputFile>
    )
}