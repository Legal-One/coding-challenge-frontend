import React from "react";
import { Chart } from "react-google-charts";

const DataChart = ({ chartType, chartData }) => {
    return (
        <Chart
            width={"100%"}
            height={"500px"}
            chartType={chartType}
            data={chartData}
        />
    );
};

export default DataChart;
