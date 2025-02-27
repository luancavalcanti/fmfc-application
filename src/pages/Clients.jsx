import CreateTable from "../components/CreateTable";
import useGetData from "../hooks/useGetData";

export default function Clients() {
  const collectionName = 'clients'
  const { data } = useGetData(collectionName)

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

  return (
    <div>
      <CreateTable
        data={data}
        tableValues={clientsDefaultValues}
        defaultValues={clientsDefaultValues}
        name="Clients"
        collectionName={collectionName}
        fields={clientsFields}
      />
    </div>

  );
}
