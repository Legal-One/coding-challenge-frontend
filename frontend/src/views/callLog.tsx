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
import {
    Tooltip,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Bar,
  } from "recharts";
const axios = require("axios").default;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface RouteParams {
  selectedNum: string;
}

type callDataType = {
    id: string,
    agent_name: string,
    date_time: string,
    duration: number,
    resolution: string,
}

type chartDataType = {
    name: string;
    value: number;
}
function CallLog() {
  let { selectedNum } = useParams<RouteParams>();
  const classes = useStyles();
  const callUrl = `http://localhost:3000/call/${selectedNum}`;
  const [tableData, setTableData] = useState<callDataType[]>([]);
  const [chartData, setChartData] = useState<chartDataType[]>([]);

  const aggregateDataForChart = (data:callDataType[]) => {
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

  const prepareChartData = (tableData:callDataType[]) => {
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
      <div>Avg Call Duration per Resolution For Agent</div>
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
            <TableCell align="right">Agent Name</TableCell>
            <TableCell align="right">Call Date and Time</TableCell>
            <TableCell align="right">Resolution</TableCell>
            <TableCell align="right">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="right">{row.agent_name}</TableCell>
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
export default CallLog;
