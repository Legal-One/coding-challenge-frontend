import React, { Component } from "react";
import "./App.css";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { IgrGridColumnOptionsModule } from "igniteui-react-grids";
import { IgrDataGridToolbarModule } from "igniteui-react-grids";
import { IgrDataGrid } from "igniteui-react-grids";
import { IgrTextColumn } from "igniteui-react-grids";

IgrGridColumnOptionsModule.register();
IgrDataGridToolbarModule.register();

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
    this.setState({ agentID: id, agentName: name, flag: 1, phoneNum: "" });

    fetch(`/agent?id=${encodeURIComponent(id)}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ barDataSource: res.data });
      });
  };

  chartEventCallback(eventObj, dataObj) {
    let value = dataObj.id;
    this.setState({ phoneNum: value, flag: 0, agentID: "" });

    fetch(`/call?number=${encodeURIComponent(value)}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ barDataSource: res.data });
      });
  }

  render() {
    const {
      dataSource,
      barDataSource,
      phoneNum,
      agentName,
      agentID,
      flag,
      namesList
    } = this.state;
    return (
      <div className="App">
        <h2>Calling Management System</h2>
        <div className="chartContainer">
          <ReactFusioncharts
            type="pie3d"
            width={800}
            height={600}
            dataFormat="JSON"
            dataSource={dataSource}
            fcEvent-dataplotClick={this.chartEventCallback.bind(this)}
          />

          <ul>
            <h3>Agents</h3>
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
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
        {(phoneNum || agentName) && (
          <div className="gridContainer">
            {flag === 0 && (
              <p>
                <span>Phone Number: </span> <b>{phoneNum}</b>{" "}
              </p>
            )}
            {flag === 1 && (
              <p>
                <span>Agent Name: </span> <b>{agentName}</b>
              </p>
            )}
            <IgrDataGrid
              height="100%"
              width="100%"
              dataSource={barDataSource}
              autoGenerateColumns="false"
            >
              {flag === 0 ? (
                <IgrTextColumn field="value" headerText="Agent Name" />
              ) : (
                <IgrTextColumn field="phone" headerText="Phone Number" />
              )}
              <IgrTextColumn field="dateTime" headerText="Date/Time" />
              <IgrTextColumn field="resolution" headerText="Resolution" />
            </IgrDataGrid>
          </div>
        )}
      </div>
    );
  }
}

export default App;
