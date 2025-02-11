import { useState } from "react";

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
        <>
            <label hidden={hidden}>{label}</label>
            <input type="file" onChange={handleImageChange} name={name} multiple hidden={hidden} />
            <br />
            {previewImages?.map((image, index) => (<img key={index} src={image} style={{ width: "150px", borderRadius: "10px", padding: "5px" }} />))}
        </>
    )
}