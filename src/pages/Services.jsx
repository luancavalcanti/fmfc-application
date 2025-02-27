import CreateTable from "../components/CreateTable"
import useGetData from "../hooks/useGetData"

export default function Services() {
    const collectionName = 'services'
    const { data } = useGetData(collectionName)

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
            <CreateTable
                data={data}
                tableValues={servicesDefaultValues}
                defaultValues={servicesDefaultValues}
                name="Services"
                collectionName={collectionName}
                fields={servicesFields}
            />
        </div>
    )
}