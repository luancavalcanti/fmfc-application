import { useContext } from "react";
import CreateTable from "../components/CreateTable";
import { EmployeeContext } from "../context/EmployeeContext";

export default function Employees() {
    const employeeContext = useContext(EmployeeContext)

    return (
        <div>
            <CreateTable
                context={employeeContext}
                name="Employees"
            />
        </div>
    )
}