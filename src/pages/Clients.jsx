import { CRUDProvider } from "../context/CURDContext";
import DefaultCRUD from "../components/DefaultCRUD";

export default function Clients() {
  const formDefaultClients = {
    name: "",
    location: "",
    phone: "",
    email: "",
    responsible: "",
  }
  const formObject = [
    {
      label: "Name",
      type: "text",
      name: "name",
    },
    {
      label: "Location",
      type: "text",
      name: "location",
    },
    {
      label: "Phone",
      type: "tel",
      name: "phone",
    },
    {
      label: "E-mail",
      type: "email",
      name: "email",
    },
    {
      label: "Responsible",
      type: "text",
      name: "responsible",
    },
  ];

  return (
    <CRUDProvider collectionName="clients" formDefault={formDefaultClients}>
      <DefaultCRUD
        title="Clients"
        formObject={formObject}
      />
    </CRUDProvider>
  );
}
