import React, { Component } from "react";
import "./App.css";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { withRouter } from "react-router-dom";

charts(FusionCharts);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agentID: "",
      agentName: "",
      greeting: "",
      phoneNum: "",
      flag: 0,
      namesList: [],
      dataSource: {
        chart: {
          caption: "",
          subcaption: "",
          enablesmartlabels: "0",
          startingAngle: "90",
          showPercentValues: "1",
          showlegend: "0",
          usedataplotcolorforlabels: "1",
          decimals: "1",
          seriesNameInToolTip: "0",
          useDataPlotColorForLabels: "1",
          theme: "fusion",
          toolTipBgColor: "#FFFFFF",
          toolTipBgAlpha: "80",
          baseFont: "Verdana",
          baseFontSize: "13",
          baseFontColor: "#00000090",
          captionPadding: "40",
          toolTipPadding: 10
        },
        data: []
      },
      barDataSource: []
    };
  }

  componentDidMount() {
    fetch("/api")
      .then(res => res.json())
      .then(res => {
        let temp = { ...this.state.dataSource };
        temp.data = res.data;
        const uniqueObjects = [
          ...new Map(res.data.map(item => [item.name, item])).values()
        ];

        this.setState({ dataSource: temp, namesList: uniqueObjects });
      });
  }

  handleAgent = (id, name) => {
    this.props.history.push(`/agent/${id}`, { id: id, name: name });
  };

  chartEventCallback(eventObj, dataObj) {
    let value = dataObj.id;
    this.props.history.push(`/call/${value}`, {
      phone: value
    });
  }

  render() {
    const { dataSource, agentID, namesList } = this.state;
    return (
      <div className="App">
        <h2>Calling Management System</h2>
        <div className="chartContainer">
          <ReactFusioncharts
            type="pie3d"
            width={1000}
            height={700}
            dataFormat="JSON"
            dataSource={dataSource}
            fcEvent-dataplotClick={this.chartEventCallback.bind(this)}
          />

          <ul>
            <h3>Agents List</h3>
            {namesList &&
              namesList.map((item, index) => (
                <li
                  key={index}
                  value={item.agentID}
                  onClick={() => this.handleAgent(item.agentID, item.name)}
                  style={{
                    color: agentID === item.agentID ? "green" : "black",
                    fontWeight: agentID === item.agentID ? "700" : "400"
                  }}
                >
                  <p>
                    <span>
                      {index + 1}. {item.name}{" "}
                    </span>
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
