import { useContext } from "react";
import CreateTable from "../components/CreateTable";
import { ComplaintsContext } from "../context/ComplaintsContext";

export default function Complaints() {
    const complaintContext = useContext(ComplaintsContext)

    return (
        <div>
            <CreateTable
                context={complaintContext}
                name="Complaints"
            />
        </div>

    );
}