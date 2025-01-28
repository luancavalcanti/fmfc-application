import DefaultCRUD from "../components/DefaultCRUD"

export default function Services(role) {
    const formDefaultServices = {
        desc: ""
    }
    const formObjectServices = [
        {
            label: "Description",
            type: "text",
            name: "desc"
        }
    ]
    return (
        <DefaultCRUD
            title="Services"
            collectionName="services"
            formObject={formObjectServices}
            formDefault={formDefaultServices}
            role={role}
        />

    )
}