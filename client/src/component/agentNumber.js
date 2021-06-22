import axios from 'axios';
import React, { useState,  useEffect } from 'react';


const AgentNumber =()=>{
    
    const [Data, setData] = useState([]);
    const [count , setCount] = useState(0);

    useEffect(async() => {
        const data  = await axios.get(`http://localhost:8000${window.location.pathname}`)
        const AgentNum = data.data
        console.log(AgentNum[count])
        setData(AgentNum);
        setCount(count+1);
    }, []);

   

    return(
        <div>
            <h1>AgentNumber</h1>
            <table>
            <tr>
            <th>Agent Name</th>
            <th>calls Date and Time</th>
            <th>Resolution</th>
            </tr>
            {
                    Data && Data.map(elem => {
                         return(
                             <tr key={elem.id}>
                             <td>{elem.name}</td>
                             <td>{elem.time}</td>
                             <td>{elem.resolution}</td>
                             </tr>
                         )
                     })
                 }
                  
            </table>
        </div>
    )
}
export default AgentNumber;