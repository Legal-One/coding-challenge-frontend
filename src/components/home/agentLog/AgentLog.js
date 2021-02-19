import React, { useEffect, useState } from "react";
import "./agentLog.css"

const link = `http://localhost:3001/agent/`;

const AgentLog = (props) => {
  const [agentData, setAgentData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let response = await fetch(link);
    let data = await response.json();
    setAgentData(data);
    setIsLoading(false);
  };

  return isLoading ? null : (
    <>
      {agentData.map((item, i) => {
        if (item.identifier === props.agentId) {
          return (
            <div className="agentLog" key={i} >
              <div >
                <img src={item.photo} alt="agent photo" style={{ marginTop: "10px" }} />
              </div>
              <div style={{ margin: "10px" }}>
                <p style={{ textAlign: "center" }}>
                  Name: {item.firstName} {item.lastName}
                </p>
                <p style={{ textAlign: "center" }}> Email: {item.email}</p>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default AgentLog;
