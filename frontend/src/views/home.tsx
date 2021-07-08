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
import {Link} from "react-router-dom";
const axios = require("axios").default;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
type dashboardData = {
  number: string;
  num_calls: number;
  agent_id: string;
  last_agent: string;
  call_id: string;
  last_call: string;
  duration_sum: number;
};
function Home() {
  const classes = useStyles();
  const dashboardUrl = "http://localhost:3000/";
  const [tableData, setTableData] = useState<dashboardData[]>([]);

  const fetchDashboardData = async () => {
    const response = await axios.get(dashboardUrl);
    console.log(response.data);
    setTableData(response.data);
  };

  const prettyPrintDate = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Number of Calls</TableCell>
            <TableCell align="right">Last Call Agent</TableCell>
            <TableCell align="right">Last Call Time</TableCell>
            <TableCell align="right">Avg Call Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.call_id}>
              <TableCell align="right">
                  <Link to={`/call/${row.number}`}>{row.number}</Link>
              </TableCell>
              <TableCell align="right">{row.num_calls}</TableCell>
              <TableCell align="right">
                    <Link to={`/agent/${row.agent_id}`}>{row.last_agent}</Link>
                <Button color="primary"></Button>
              </TableCell>
              <TableCell align="right">
                {prettyPrintDate(row.last_call)}
              </TableCell>
              <TableCell align="right">
                {(row.duration_sum / row.num_calls).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Home;
