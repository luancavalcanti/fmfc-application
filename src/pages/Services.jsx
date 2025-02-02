import CreateTable from "../components/CreateTable"

export default function Services() {
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

    const props = {
        fields: servicesFields,
        defaultValues: servicesDefaultValues,
        collectionName: 'services'
    }
    return (
        <div>
            <CreateTable {...props} />
        </div>
    )
}