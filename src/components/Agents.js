import React, { useState, useEffect } from "react";
import Table from "./LogTable";

const Agents = props => {
  const backTxt = "< BACK";
  const { id, name } = props.location.state;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/agent?id=${encodeURIComponent(id)}`)
      .then(res => res.json())
      .then(res => {
        setData(res.data);
      });
  }, [id]);

  return (
    <div className="gridContainer mt-2">
      <p className="hand-cursor " onClick={() => props.history.goBack()}>
        {backTxt}
      </p>
      <p className="text-center">
        <span>Agent Name: </span> <b>{name}</b>
      </p>
      {data && <Table data={data} flag={1} />}
    </div>
  );
};

export default Agents;
