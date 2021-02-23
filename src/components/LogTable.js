import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const LogTable = props => {
  const columns1 = [
    {
      dataField: "value",
      text: "Agent Name"
    },
    {
      dataField: "dateTime",
      text: "Date/Time"
    },
    {
      dataField: "resolution",
      text: "Resolution"
    }
  ];

  const columns2 = [
    {
      dataField: "phone",
      text: "Phone Number"
    },
    {
      dataField: "dateTime",
      text: "Date/Time"
    },
    {
      dataField: "resolution",
      text: "Resolution"
    }
  ];

  return (
    <div className="gridContainer ">
      <BootstrapTable
        keyField="dateTime"
        data={props.data}
        columns={props.flag === 0 ? columns1 : columns2}
      />
    </div>
  );
};

export default LogTable;
