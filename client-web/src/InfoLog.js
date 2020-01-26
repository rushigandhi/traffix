import React from "react";
import { Table, Divider, Tag } from "antd";
import Websocket from "react-websocket";

const columns = [
  {
    title: "Incident Type",
    dataIndex: "type",
    key: "type",
    render: text => (
      <a>
        {text === "UNSAFE_VEHICLE"
          ? "Unsafe Vehicle"
          : text === "STRONG_WIND"
          ? "Strong Wind"
          : "Gunshot"}
      </a>
    )
  },
  {
    title: "Longitude",
    dataIndex: "lat",
    key: "lat"
  },
  {
    title: "Latitude",
    dataIndex: "lng",
    key: "lng"
  },
  {
    title: "Date",
    dataIndex: "time",
    key: "time"
  },
  {
    title: "Warning",
    key: "warning",
    dataIndex: "warning",
    render: text => {
      let color = text === "MODERATE" ? "geekblue" : "green";
      if (text === "SEVERE") {
        color = "volcano";
      }
      return (
        <span>
          <Tag color={color} key={1}>
            {text.toLowerCase()}
          </Tag>
        </span>
      );
    }
  }
];

export class InfoLog extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  handleData = data => {
    data = JSON.parse(data);
    if (data.type !== "INFO_SESS") {
      return;
    }
    data = data.data;
    for (let i = 0; i < data.length; i++) {
      data[i].lat = data[i].location.lat;
      data[i].lng = data[i].location.lng;
    }
    this.setState({
      data
    });
  };

  render() {
    return (
      <React.Fragment>
        <Websocket url="ws://localhost:8888/" onMessage={this.handleData} />
        <Table columns={columns} dataSource={this.state.data} />
      </React.Fragment>
    );
  }
}
