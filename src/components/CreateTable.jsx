export default function CreateTable({ defaultValues, data, viewUpdate }) {

    const headers = Object.keys(defaultValues);

    return (
        <>
            <h1>Table</h1>
            <table style={{ backgroundColor: "grey", padding: "10px", borderRadius: "10px" }}>
                <thead>
                    <tr>
                        {headers.map((key, index) => (
                            <td key={index}>{key}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.length > 0
                            ? data.map((item, index) => (
                                <tr key={index}>
                                    {headers.map((key, index) => (
                                        <td key={index}>
                                            {Array.isArray(item[key])
                                                ? <ul>{item[key].map((item, index) => <li key={index}>{item}</li>)}</ul>
                                                : (item[key])}
                                        </td>
                                    ))}
                                    <td><button onClick={() => viewUpdate(item.id)}>View</button></td>
                                </tr>
                            ))
                            : <tr><td>No data...</td></tr>
                    }
                </tbody>
            </table>

        </>

    )
}