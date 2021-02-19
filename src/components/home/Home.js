import React, { useEffect, useState } from "react";
import { ChartComponent } from "bar-chart-simple";
import AgentLog from "./agentLog/AgentLog";
import CallLog from "./callLog/CallLog"
import "./home.css";

const link = `http://localhost:3001/`;

const Home = () => {
  const [homeData, setHomeData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [agentId, setAgentId] = useState("");
  const [numberId, setNumberId] = useState("");
  const [agentModalVisible, setAgentModalVisible] = useState(true);
  const [numberModalVisible, setNumberModalVisible] = useState(true);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let response = await fetch(link);
    let data = await response.json();
    setHomeData(data);
    setIsLoading(false);
  };

  // data for chart
  let data = () => {
    let dataArr = [];
    if (isLoading) {
      return null;
    } else {
      homeData.map((item, i) => {
        dataArr.push({
          data_category: item.number,
          data_value: item.numberOfCalls,
        });
      });
    }
    return dataArr;
  };

  let openModal = (modal) => {
    modal(false);
  };

  let closeModal = (modal) => {
    modal(true);
  };


  return isLoading ? null : (
    <>
      <table>
        <thead>
          <tr>
            <th>Phone number</th>
            <th>Number of calls</th>
            <th>Last call details</th>
          </tr>
        </thead>
        <tbody>
          {homeData.map((item, i) => (
            <tr key={i}>
              <td style={{cursor:"pointer"}}
                  onClick={() => {
                  setNumberId(item.number);
                  openModal(setNumberModalVisible);
                }}>{item.number}</td>
              <td>{item.numberOfCalls}</td>
              <td style={{cursor:"pointer"}}
                onClick={() => {
                setAgentId(item.agentId);
                openModal(setAgentModalVisible);
              }}
              >
                {item.agentName} / {item.lastCall.slice(11, -8)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="modal" style={agentModalVisible ? { display: "none" } : { display: "block" }}>
        <AgentLog agentId={agentId} />
        <button onClick={() => closeModal(setAgentModalVisible)} className="modalButton">Close</button>
      </div>
      <div className="modal" style={numberModalVisible ? { display: "none" } : { display: "block" }}>
        <CallLog numberId={numberId} />
        <button onClick={() => closeModal(setNumberModalVisible)} className="modalButton">Close</button>
      </div>
      <ChartComponent data={data()} chart_type="bar_chart" />
    </>
  );
};

export default Home;
