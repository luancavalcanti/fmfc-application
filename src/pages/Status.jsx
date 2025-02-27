import CreateTable from "../components/CreateTable";
import useGetData from "../hooks/useGetData";

export default function Status() {

    const collectionName = 'status'
    const { data } = useGetData(collectionName)
    const sortedData = data.sort((a, b) => Number(a.order) - Number(b.order))

    const statusDefaultValues = {
        order: "",
        name: "",
        desc: "",
        color: "#000000",
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
            <CreateTable
                data={sortedData}
                tableValues={statusDefaultValues}
                defaultValues={statusDefaultValues}
                name="Status"
                collectionName={collectionName}
                fields={statusFields}
            />
        </div>

    );
}