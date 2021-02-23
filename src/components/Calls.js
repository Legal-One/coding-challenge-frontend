import React, { useEffect, useState } from "react";
import Table from "./LogTable";

const Calls = props => {
  const [data, setData] = useState([]);
  const { phone } = props.location.state;

  useEffect(() => {
    fetch(`/call?number=${encodeURIComponent(phone)}`)
      .then(res => res.json())
      .then(res => {
        setData(res.data);
      });
  }, [phone]);

  const backTxt = "< BACK";
  return (
    <div className="gridContainer mt-2">
      <p className="hand-cursor" onClick={() => props.history.goBack()}>
        {backTxt}
      </p>
      <p className="text-center">
        <span>Phone Number: </span> <b>{phone}</b>
      </p>

      <Table data={data} flag={0} />
    </div>
  );
};

export default Calls;
