import CreateTable from "../components/CreateTable"
import { ContractContext } from "../context/ContractsContext"
import { useContext } from "react"

export default function Contracts() {
    const contractsContext = useContext(ContractContext)
    return (
        <>
            <CreateTable
                context={contractsContext}
                name="Contracts"
            />
        </>
    )
}