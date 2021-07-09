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
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from "recharts";
import "./home.css";
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

type avgDataType = {
    duration_sum: number;
    num_calls: number;
};

type graphDataType = {
  name: string;
  value: number;
};
function Home() {
  const classes = useStyles();
  const dashboardUrl = "http://localhost:3000/";
  const [tableData, setTableData] = useState<dashboardData[]>([]);
  const [graphData, setGraphData] = useState<graphDataType[]>([]);
  const [barData, setBarData] = useState<graphDataType[]>([]);
  
  const aggregateDataForChart = (data: dashboardData[]) => {
    const dataMap = new Map();
    for (let it = 0; it < data.length; it++) {
      const row = data[it];
      const key = row.last_agent;
      if (dataMap.get(key) != null) {
        const prevEntry: number = dataMap.get(key);
        dataMap.set(key, row.num_calls + prevEntry);
        continue;
      }
      dataMap.set(key, row.num_calls);
    }
    return dataMap;
  };

  const aggregateDataForBar = (data: dashboardData[]) => {
    const dataMap = new Map();
    for (let it = 0; it < data.length; it++) {
      const row = data[it];
      const key = row.last_agent;
      if (dataMap.get(key) != null) {
        const prevEntry: avgDataType = dataMap.get(key);
        const newEntry = {
            duration_sum: row.duration_sum + prevEntry.duration_sum,
            num_calls: row.num_calls + prevEntry.num_calls,
        }
        dataMap.set(key, newEntry);
        continue;
      }
      const newEntry = {
        duration_sum: row.duration_sum,
        num_calls: row.num_calls,
      }
      dataMap.set(key, newEntry);
    }
    return dataMap;
  }

  const preparePieChartData = (tableData: dashboardData[]) => {
    const dataMap = aggregateDataForChart(tableData);
    const tempDataArr: graphDataType[] = [];
    dataMap.forEach((val, key) => {
      const row: graphDataType = {
        name: key,
        value: val,
      };
      tempDataArr.push(row);
    });
    setGraphData(tempDataArr);
  };

  const prepareBarChartData = (tableData: dashboardData[]) => {
      const dataMap = aggregateDataForBar(tableData);
      const tempDataArr: graphDataType[] = [];
      dataMap.forEach((val, key) => {
        const avg: number = parseFloat((val.duration_sum/val.num_calls).toFixed(2));
        const row: graphDataType = {
            name: key,
            value: avg,
        }
        tempDataArr.push(row);
      });
      setBarData(tempDataArr);
  }

  const fetchDashboardData = async () => {
    const response = await axios.get(dashboardUrl);
    setTableData(response.data);
    preparePieChartData(response.data);
    prepareBarChartData(response.data)
  };

  const prettyPrintDate = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <div id="chartSection" className="chart-section">
        <div id="pieChart" className="chart-container">
          <div>Number of Calls per Agent</div>
          <PieChart width={400} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={graphData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
        <div id="barChart" className="chart-container">
          <div>Avg Call Duration per Agent</div>
          <BarChart width={730} height={250} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
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
    </div>
  );
}

export default Home;
