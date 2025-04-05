import { useContext } from "react"
import CreateTable from "../components/CreateTable"
import { ServicesContext } from "../context/ServicesContext"

export default function Services() {
    const serviceContext = useContext(ServicesContext)

    return (
        <div>
            <CreateTable
                context={serviceContext}
                name="Services"
            />
        </div>
    )
}