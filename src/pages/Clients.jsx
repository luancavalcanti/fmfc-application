import CreateForm from "../components/CreateForm";
import CreateTable from "../components/CreateTable";
import CreateUpdate from "../components/CreateUpdate";
import useGetData from "../hooks/useGetData";
import useShowController from "../hooks/useShowController";

export default function Clients() {
  const { viewUpdate, showEdit, showForm, setShowForm, id } = useShowController()
  const collectionName = 'clients'
  const { data, getData } = useGetData(collectionName)

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
      {showForm && <CreateForm
        defaultValues={clientsDefaultValues}
        fields={clientsFields}
        collectionName={collectionName}
        data={data}
        onCreate={getData}
        viewUpdate={viewUpdate}
      />}
      <CreateTable
        defaultValues={clientsDefaultValues}
        data={data}
        viewUpdate={viewUpdate}
        id={id}
        setShowForm={setShowForm}
        showForm={showForm}
        name="Clients"
      />
      {showEdit &&
        <CreateUpdate
          id={id}
          viewUpdate={viewUpdate}
          collectionName={collectionName}
          fields={clientsFields}
          onUpdate={getData}
        />
      }
    </div>

  );
}
