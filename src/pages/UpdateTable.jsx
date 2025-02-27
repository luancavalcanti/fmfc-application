import { useLocation, useParams } from "react-router-dom";
import CreateUpdate from "../components/CreateUpdate";
import useGetData from "../hooks/useGetData";

export default function UpdateTable() {
    const { id } = useParams();
    const location = useLocation();
    const { fields, name, collectionName } = location.state;
    const { getData } = useGetData(collectionName)
    return (
        <div>
            <h2>Update {name}</h2>
            <CreateUpdate
                id={id}
                // viewUpdate={viewUpdate}
                collectionName={collectionName}
                fields={fields}
                onUpdate={getData}
            />
        </div>
    )
}