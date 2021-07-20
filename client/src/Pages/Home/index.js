import React, { useState, useEffect } from "react";
import axios from "axios";
import CallLogs from "../../components/CallLogs";

const apiUrl = "http://localhost:5000/api/call-logs";
function Home() {
    const [callLogs, setCallLogs] = useState([]);

    useEffect(() => {
        const fetchCallLogs = async () => {
            const response = await axios.get(apiUrl);
            setCallLogs(response.data);
        };
        fetchCallLogs();
    }, []);

    return (
        <div>
            <CallLogs callLogs={callLogs} />
        </div>
    );
}
export default Home;
