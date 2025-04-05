import { useContext } from "react";
import CreateTable from "../components/CreateTable";
import { StatusContext } from "../context/StatusContext";

export default function Status() {

    const statusContext = useContext(StatusContext)

    return (
        <div>
            <CreateTable
                context={statusContext}
                name="Status"
            />
        </div>

    );
}