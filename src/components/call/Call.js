import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../home/home.css";

const link = `http://localhost:3001/call/`;

    const Call = () => {
        let { number } = useParams();
        const [callData, setCallData] = useState("");
        const [isLoading, setIsLoading] = useState(true)
        useEffect(() => {
            getData();
        }, []);
        const getData = async () => {
            let response = await fetch(link + number);
            let data = await response.json()
            setCallData(data);
            setIsLoading(false)
        }
    return (
     isLoading ? null : ( <>  
      {callData == "" ? <p>cant find number</p> :  <table>
            <thead>
              <tr>
                <th>Agent Name</th>
                <th>Call date and time</th>
                <th>Resolution</th>
              </tr>
            </thead>
            <tbody>
              {callData.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{`${item.date.slice(0, 10).replace(/-/g, "/")} ${item.date.slice(11, -5)}`}</td>
                  <td>{item.res} </td>
                </tr>
              ))}
            </tbody>
          </table>}
      </>)
    );
};

export default Call;
