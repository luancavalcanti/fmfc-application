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
    <DefaultCRUD
      title="Clients"
      collectionName="clients"
      formObject={formObject}
      formDefault={formDefaultClients}
    />
  );
}
