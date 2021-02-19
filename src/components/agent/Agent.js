import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../home/home.css";

const link = `http://localhost:3001/agent/`;

const Agent = () => {
  let { id } = useParams();
  const [agentData, setAgentData] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getData();
  }, []);
  //get data by id from localhost
  const getData = async () => {
    let response = await fetch(link + id);
    let data = await response.json()
    setAgentData(data);
    setIsLoading(false)
  }
  return (
    isLoading ? null : (<>
    {agentData == "" ? <p>cant find id</p> : <table>
        <thead>
          <tr>
            <th>Phone number</th>
            <th>Call date and time</th>
            <th>Resolution</th>
          </tr>
        </thead>
        <tbody>
          {agentData.map((item, i) => (
            <tr key={i}>
              <td>{item.number}</td>
              <td>{`${item.date.slice(0, 10).replace(/-/g, "/")} ${item.date.slice(11, -5)}`}</td>
              <td>{item.res} </td>
            </tr>
          ))}
        </tbody>
      </table>}
       
    </>)
  );
};

export default Agent;
