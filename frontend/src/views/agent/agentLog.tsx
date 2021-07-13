import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {Link, useParams} from "react-router-dom";
import {
    Tooltip,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Bar,
  } from "recharts";
import "./agentLog.css";
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

type chartDataType = {
    name: string;
    value: number;
}
function AgentLog() {
  let { agentId } = useParams<RouteParams>();
  const classes = useStyles();
  const callUrl = `http://localhost:3000/agent/${agentId}`;
  const [tableData, setTableData] = useState<agentDataType[]>([]);
  const [chartData, setChartData] = useState<chartDataType[]>([]);

  const aggregateDataForChart = (data:agentDataType[]) => {
    const dataMap = new Map();
    for(let it=0;it<data.length;it++) {
        const row = data[it];
        if (dataMap.get(row.resolution) != null) {
            const prevRow = dataMap.get(row.resolution);
            const newRow = {
                duration: row.duration + prevRow.duration,
                count: prevRow.count + 1,
            }
            dataMap.set(row.resolution, newRow);
            continue;
        }
        const newRow = {
            duration: row.duration,
            count: 1,
        }
        dataMap.set(row.resolution, newRow);
    }
    return dataMap;
  }

  const prepareChartData = (tableData:agentDataType[]) => {
    const dataMap = aggregateDataForChart(tableData);
    let tempDataArr: chartDataType[] = [];
    dataMap.forEach((val,key)=> {
        const avg = parseFloat((val.duration/val.count).toFixed(2));
        const row: chartDataType = {
            name: key,
            value: avg,
        }
        tempDataArr.push(row);
    })
    setChartData(tempDataArr)
  }

  const fetchDashboardData = async () => {
    const response = await axios.get(callUrl);
    setTableData(response.data);
    prepareChartData(response.data)
  };

  const prettyPrintDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
        <div id="barChart" className="chart-container">
          <div>Avg Call Duration per Resolution</div>
          <BarChart width={730} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
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
    </div>
  );
}
export default AgentLog;