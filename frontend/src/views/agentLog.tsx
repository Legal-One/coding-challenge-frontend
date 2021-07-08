import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {Link, useParams} from "react-router-dom";
const axios = require("axios").default;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface RouteParams {
    agentId: string;
}

type agentDataType = {
    id: string,
    number: string,
    date_time: string,
    duration: number,
    resolution: string,
}
function AgentLog() {
  let { agentId } = useParams<RouteParams>();
  const classes = useStyles();
  const callUrl = `http://localhost:3000/agent/${agentId}`;
  const [tableData, setTableData] = useState<agentDataType[]>([]);

  const fetchDashboardData = async () => {
    const response = await axios.get(callUrl);
    setTableData(response.data);
  };

  const prettyPrintDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Phone number</TableCell>
            <TableCell align="right">Call Date and Time</TableCell>
            <TableCell align="right">Resolution</TableCell>
            <TableCell align="right">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="right">{row.number}</TableCell>
              <TableCell align="right">
                {prettyPrintDateTime(row.date_time)}
              </TableCell>
              <TableCell align="right">
                {row.resolution}
              </TableCell>
              <TableCell align="right">
                {row.duration}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default AgentLog;