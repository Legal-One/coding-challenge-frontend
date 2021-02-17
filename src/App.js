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
      logs: [],
      dataSource: {
        chart: {
          caption: "Top 5 countries with Global Oil Reserves",
          subcaption: "MMbbl= One Million barrels",
          enablesmartlabels: "0",
          startingAngle: "0",
          showPercentValues: "1",
          decimals: "1",
          seriesNameInToolTip: "0",
          useDataPlotColorForLabels: "1",
          theme: "fusion"
        },
        data: [
          {
            label: "+49151484522",
            value: "3",
            displayValue: "Lowest sale.{br}$920K",
            //Using custom tooltip
            tooltext: "Lowest sale for last week. Indiana $dataValue"
          },
          {
            label: "+49158544147",
            value: "2"
          },
          {
            label: "+49151783331",
            value: "1"
          },
          {
            label: "+49151514231",
            value: "1"
          },
          {
            label: "+49221514231",
            value: "2"
          }
        ]
      }
    };
    this.handleCall = this.handleCall.bind(this);
    this.handleAgent = this.handleAgent.bind(this);
  }

  componentDidMount() {
    // fetch("/api")
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({ logs: res });
    //   });
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

  render() {
    const { dataSource } = this.state;
    return (
      <div className="App">
        <ReactFusioncharts
          type="pie3d"
          width={800}
          height={600}
          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>
    );
  }
}

export default App;
