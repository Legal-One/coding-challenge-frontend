import React, { useState, useEffect } from "react";
import axios from "axios";
import NumberCallLogs from "../../components/NumberCallLogs";
import {useParams} from "react-router-dom";
import "./index.scss";

const apiUrl = "http://localhost:5000/api/call/";

function Phone() {
    const {phoneNumber} = useParams();

    const [phoneNumberCallLogs, setPhoneNumberCallLogs] = useState([]);

    useEffect(() => {
        const fetchPhoneNumberCallLogs = async () => {
            const response = await axios.get(apiUrl + phoneNumber);
            setPhoneNumberCallLogs(response.data);
        };
        fetchPhoneNumberCallLogs();
    }, [phoneNumber]);


    return (
        <div>
            <NumberCallLogs phoneNumberCallLogs={phoneNumberCallLogs}/>
        </div>
    );
}
export default Phone;