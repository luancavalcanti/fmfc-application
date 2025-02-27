import CreateTable from "../components/CreateTable";
import useGetData from "../hooks/useGetData";

export default function Complaints() {
    const collectionName = 'complaints'
    const { data } = useGetData(collectionName)
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

    const complaintsTableValues = {
        contract: "",
        complaint: "",
        images: [],
        // date_in: getCurrentDate(),
        // date_out: "",
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
            <CreateTable
                data={data}
                tableValues={complaintsTableValues}
                defaultValues={complaintsDefaultValues}
                name="Complaints"
                collectionName={collectionName}
                fields={complaintsFields}
            />
        </div>

    );
}