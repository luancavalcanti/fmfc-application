import CreateTable from "../components/CreateTable";

export default function Clients() {
  const clientsDefaultValues = {
    name: "",
    location: "",
    phone: "",
    email: "",
    responsible: "",
  }
  const clientsFields = [
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
  const props = {
    fields: clientsFields,
    defaultValues: clientsDefaultValues,
    collectionName: 'clients'
  }

  return (
    <div>
      <CreateTable {...props} />
    </div>

  );
}
