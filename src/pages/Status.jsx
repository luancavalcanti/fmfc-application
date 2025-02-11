import CreateForm from "../components/CreateForm";
import CreateTable from "../components/CreateTable";
import CreateUpdate from "../components/CreateUpdate";
import useGetData from "../hooks/useGetData";
import useShowController from "../hooks/useShowController";

export default function Status() {
    const { viewUpdate, showEdit, showForm, setShowForm, id } = useShowController()
    const collectionName = 'status'
    const { data, getData } = useGetData(collectionName)
    const sortedData = data.sort((a, b) => Number(a.order) - Number(b.order))

    const statusDefaultValues = {
        order: "",
        name: "",
        desc: "",
        color: "",
    }
    const statusFields = [
        {
            label: "Order",
            type: "text",
            name: "order",
        },
        {
            label: "Name",
            type: "text",
            name: "name",
        },
        {
            label: "Description",
            type: "textarea",
            name: "desc",
        },
        {
            label: "Color",
            type: "color",
            name: "color",
        },
    ];

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>New</button>
            {showForm && <CreateForm
                defaultValues={statusDefaultValues}
                fields={statusFields}
                collectionName={collectionName}
                data={sortedData}
                onCreate={getData}
                viewUpdate={viewUpdate}
            />}
            <CreateTable
                defaultValues={statusDefaultValues}
                data={sortedData}
                viewUpdate={viewUpdate}
            />
            {showEdit &&
                <CreateUpdate
                    id={id}
                    viewUpdate={viewUpdate}
                    collectionName={'status'}
                    fields={statusFields}
                    onUpdate={getData}
                />
            }
        </div>

    );
}