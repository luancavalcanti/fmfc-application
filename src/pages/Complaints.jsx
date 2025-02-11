import CreateForm from "../components/CreateForm";
import CreateTable from "../components/CreateTable";
import CreateUpdate from "../components/CreateUpdate";
import useGetData from "../hooks/useGetData";
import useShowController from "../hooks/useShowController";

export default function Complaints() {
    const { viewUpdate, showEdit, showForm, setShowForm, id } = useShowController()
    const collectionName = 'complaints'
    const { data, getData } = useGetData(collectionName)
    const { data: contracts } = useGetData('contracts')
    const contractList = contracts.map(contract => `${contract.client} - ${contract.service}`)
    const getCurrentDate = () => { const today = new Date(); return today.toISOString().split("T")[0]; };
    const { data: status } = useGetData('status')
    const sortedData = status.sort((a, b) => Number(a.order) - Number(b.order)).map(status => status.name)
    const complaintsDefaultValues = {
        contract: "",
        complaint: "",
        images: [],
        date_in: getCurrentDate(),
        date_out: "",
        status: "New"
    }

    const complaintsFields = [
        {
            label: "Contract",
            type: "select",
            list: contractList,
            name: "contract",
        },
        {
            label: "Complaint",
            type: "textarea",
            rows: "5",
            cols: "5",
            name: "complaint",
        },
        {
            label: "Image(s)",
            type: "file",
            name: "images",
        },
        {
            label: "Date in",
            type: "date",
            name: "date_in",
            hidden: true
        },
        {
            label: "Date out",
            type: "date",
            name: "date_out",
            hidden: true
        },
        {
            label: "Status",
            type: "select",
            list: sortedData,
            name: "status",
            hidden: true
        },
    ];

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>New</button>
            {showForm && <CreateForm
                defaultValues={complaintsDefaultValues}
                fields={complaintsFields}
                collectionName={collectionName}
                data={data}
                onCreate={getData}
                viewUpdate={viewUpdate}
            />}
            <CreateTable
                defaultValues={complaintsDefaultValues}
                data={data}
                viewUpdate={viewUpdate}
            />
            {showEdit && <CreateUpdate
                id={id}
                viewUpdate={viewUpdate}
                collectionName={collectionName}
                fields={complaintsFields}
                onUpdate={getData}
            />}
        </div>

    );
}