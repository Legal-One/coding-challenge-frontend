import React, { useEffect, useState } from 'react';

const CallLog = (props) => {
    const link = `http://localhost:3001/call/`;
    const [callData, setCallData] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (props.numberId)
            getData()
    }, [props.numberId]);

    const getData = async () => {
        let response = await fetch(link + props.numberId);
        let data = await response.json()
        setCallData(data);
        setIsLoading(false)
    }

    return (
        isLoading ? null : (<>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <table>
                    <thead>
                        <tr>
                            <th>Agent Name</th>
                            <th>Call date and time</th>
                            <th>Resolution</th>
                        </tr>
                    </thead>
                    <tbody>{callData.map((item, i) => (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>{`${item.date.slice(0, 10).replace(/-/g, "/")} ${item.date.slice(11, -5)}`}</td>
                                <td>{item.res} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>)
    );
};

export default CallLog;
