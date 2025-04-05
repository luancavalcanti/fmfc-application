import { useLocation } from "react-router-dom";
import CreateForm from "../components/CreateForm";
import useGetData from "../hooks/useGetData";

export default function NewForm() {
    const location = useLocation();
    const { defaultValues, fields, name, collectionName } = location.state;
    const { getData } = useGetData(collectionName)
    return (
        <div>
            <h2>New {name.slice(0, -1)}</h2>
            <CreateForm
                defaultValues={defaultValues}
                fields={fields}
                collectionName={collectionName}
                onCreate={getData}
            />
        </div>
    )
}