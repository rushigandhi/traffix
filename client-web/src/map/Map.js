import React from "react";
import { message } from "antd";
import { GoogleMaps } from "./GoogleMaps";
import Websocket from "react-websocket";

export class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null,
      radius: 0
    };
  }

  handleData = data => {
    data = JSON.parse(data);
    if (data.type !== "UPDATE") {
      return;
    }
    data = data.data;
    let title;

    if (data.type === "UNSAFE_VEHICLE") {
      title = "Unsafe vehicles detected!";
    } else if (data.type === "STRONG_WIND") {
      title = "Strong winds detected!";
    } else {
      title = "Gunshot detected!";
    }

    this.setState({
      location: data.location
    });

    setTimeout(() => {
      this.setState({
        location: null,
        radius: 200
      });
    }, 15000);

    message.error(title, 5);
  };

  render() {
    return (
      <div style={{ flex: 1 }}>
        <Websocket url="ws://localhost:8888/" onMessage={this.handleData} />
        <GoogleMaps
          isMarkerShown={this.state.location !== null}
          location={this.state.location}
          radius={this.state.radius}
        />
      </div>
    );
  }
}
