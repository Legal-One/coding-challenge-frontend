import React, { Component } from "react";
import "./App.css";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

charts(FusionCharts);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      greeting: "",
      dataSource: {
        chart: {
          caption: "Calling Management System",
          subcaption: "",
          enablesmartlabels: "0",
          startingAngle: "90",
          showPercentValues: "1",
          showlegend: "1",
          legendposition: "top",
          usedataplotcolorforlabels: "1",
          decimals: "1",
          seriesNameInToolTip: "0",
          useDataPlotColorForLabels: "1",
          theme: "fusion",
          toolTipBgColor: "#FFFFFF",
          legendBgColor: "#FFFFFF",
          toolTipBgAlpha: "80",
          baseFont: "Verdana",
          baseFontSize: "13",
          baseFontColor: "#00000090",
          captionPadding: "40",
          toolTipPadding: 10
        },
        data: []
      },
      barDataSource: {
        chart: {
          caption: "Countries With Most Oil Reserves [2017-18]",
          subCaption: "In MMbbl = One Million barrels",
          xAxisName: "Country",
          yAxisName: "Reserves (MMbbl)",
          numberSuffix: "K",
          theme: "fusion"
        },
        data: [
          {
            label: "Venezuela",
            value: "290"
          },
          {
            label: "Saudi",
            value: "260"
          },
          {
            label: "Canada",
            value: "180"
          },
          {
            label: "Iran",
            value: "140"
          },
          {
            label: "Russia",
            value: "115"
          },
          {
            label: "UAE",
            value: "100"
          },
          {
            label: "US",
            value: "30"
          },
          {
            label: "China",
            value: "30"
          }
        ]
      }
    };
    this.handleCall = this.handleCall.bind(this);
    this.handleAgent = this.handleAgent.bind(this);
  }

  componentDidMount() {
    fetch("/api")
      .then(res => res.json())
      .then(res => {
        let temp = { ...this.state.dataSource };
        temp.data = res.data;
        this.setState({ dataSource: temp });
      });
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleAgent(event) {
    event.preventDefault();
    const ID = "356b03dc-9ec5-11e7-97a6-d501104f897e";
    fetch(`/agent?id=${encodeURIComponent(ID)}`)
      .then(res => res.json())
      .then(res => {
        console.log("agent->", res);
      });
  }

  handleCall(event) {
    event.preventDefault();
    const number = "+49158544147";
    fetch(`/call?number=${encodeURIComponent(number)}`)
      .then(res => res.json())
      .then(res => {
        console.log("number->", res);
      });
  }

  chartEventCallback(eventObj, dataObj) {
    let ID = dataObj.id;
    let value = dataObj.value;
    console.log(value);
  }

  render() {
    const { dataSource, barDataSource } = this.state;
    return (
      <div className="App">
        <ReactFusioncharts
          type="pie3d"
          width={800}
          height={600}
          dataFormat="JSON"
          dataSource={dataSource}
          fcEvent-dataplotClick={this.chartEventCallback.bind(this)}
          fcEvent-legenditemClick={this.chartEventCallback.bind(this)}
        />
        <ReactFusioncharts
          type="column2d"
          width="100%"
          height="100%"
          dataFormat="JSON"
          dataSource={barDataSource}
        />
        ,
      </div>
    );
  }
}

export default App;
