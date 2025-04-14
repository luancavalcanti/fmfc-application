import { useLocation } from "react-router-dom";
import CreateForm from "../components/CreateForm";
import useGetData from "../hooks/useGetData";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "../context/BreadcrumbContext";

const FormStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    h3{
        color: #555;
    }
`

export default function NewForm() {
    const location = useLocation();
    const { defaultValues, fields, name, collectionName, lastCrumbs } = location.state;
    const { getData } = useGetData(collectionName)
    const { setCrumbs } = useContext(BreadcrumbContext)
    const newCrumb = `New ${name?.slice(0, -1)}`

    useEffect(() => {
        setCrumbs([...lastCrumbs, newCrumb])
    }, [setCrumbs, lastCrumbs, newCrumb]
    )

    return (
        <FormStyled>
            {/* <ButtonBack /> */}
            <h3>Form New {name?.slice(0, -1)}</h3>
            <CreateForm
                defaultValues={defaultValues}
                fields={fields}
                collectionName={collectionName}
                onCreate={getData}
            />
        </FormStyled>
    )
}