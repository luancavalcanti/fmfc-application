import CreateForm from "../components/CreateForm"
import CreateTable from "../components/CreateTable"
import CreateUpdate from "../components/CreateUpdate"
import useGetData from "../hooks/useGetData"
import useShowController from "../hooks/useShowController"

export default function Services() {
    const collectionName = 'services'
    const { data, getData } = useGetData(collectionName)
    const { viewUpdate, showEdit, showForm, setShowForm, id } = useShowController()
    const servicesDefaultValues = {
        desc: ""
    }

    const servicesFields = [
        {
            label: "Description",
            type: "text",
            name: "desc"
        }
    ]
    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>New</button>
            {showForm && <CreateForm
                collectionName={collectionName}
                defaultValues={servicesDefaultValues}
                fields={servicesFields}
                onCreate={getData}
                show={setShowForm}
            />}
            <CreateTable
                data={data}
                defaultValues={servicesDefaultValues}
                viewUpdate={viewUpdate}
            />
            {showEdit &&
                <CreateUpdate
                    id={id}
                    viewUpdate={viewUpdate}
                    collectionName={collectionName}
                    fields={servicesFields}
                    onUpdate={getData}
                />
            }
        </div>
    )
}