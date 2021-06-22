
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Agent =()=>{
    const [Data, setData] = useState([]);
    const [count ,setCount] = useState(0);

    useEffect(async() => {
        const data  = await axios.get(`http://localhost:8000${window.location.pathname}`)
        const AgentData = data.data
        setData(AgentData);
        setCount(count+1);
      
    }, []);

    return(
        <div>
            <h1>Agent</h1>
            <table>
            <tr>
            <th>Phone Number</th>
            <th>calls Date and Time</th>
            <th>Resolution</th>
            </tr>
            {
                Data && Data.map(elem => {
                     return(
                         <tr key={elem.id}>
                         <td>{elem.number}</td>
                         <td>{elem.dateTime}</td>
                         <td>{elem.resolution}</td>
                         </tr>
                     )
                 })
             }
        
            </table>
        </div>
    )
}
export default Agent;