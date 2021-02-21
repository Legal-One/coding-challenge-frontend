import React from "react";
import Table from "./LogTable";

const Calls = props => {
  const { data, phone } = props.location.state;

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
