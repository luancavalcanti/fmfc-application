import { useContext } from "react"
import DefaultCRUD from "../components/DefaultCRUD"
import { CRUDContext } from "../contex/CURDContext"

export default function Employees(){
    
    const {
        handleChangeInput,
        formData,
    } = useContext(CRUDContext)

    
 
    const formObject = [
        {
            label:"Name",
            type:"text",
            name:"name",
            value: formData.name,
            onChange: handleChangeInput
        },
        {
            label:"Lastname",
            type:"text",
            name:"lastname",
            value: formData.lastname,
            onChange: handleChangeInput
        },
        {
            label:"E-mail",
            type:"email",
            name:"email",
            value: formData.email,
            onChange: handleChangeInput
        },
        {
            label:"Phone",
            type:"tel",
            name:"phone",
            value: formData.phone,
            onChange: handleChangeInput
        },
        {
            label:"Lenguage",
            type:"text",
            name:"lenguage",
            value: formData.lenguage,
            onChange: handleChangeInput
        },
        {
            label:"DoB",
            type:"date",
            name:"dob",
            value: formData.dob,
            onChange: handleChangeInput
        },
        {
            label:"Date In",
            type:"date",
            name:"dateIn",
            value: formData.dateIn,
            onChange: handleChangeInput
        },
    ]
    return(
        <DefaultCRUD 
            title="Employees"
            collectionName="employees"
            formObject={formObject}
            formData={formData}
        />
    )
}