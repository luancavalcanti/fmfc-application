import { useContext } from "react";
import CreateTable from "../components/CreateTable";
import { ClientContext } from "../context/ClientContext";

export default function Clients() {
  const clientContext = useContext(ClientContext)
  return (
    <div>
      <CreateTable
        context={clientContext}
        name="Clients"
      />
    </div>
  );
}
