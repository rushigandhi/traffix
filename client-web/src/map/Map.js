import React from "react";
import { GoogleMaps } from "./GoogleMaps";

export class Map extends React.Component {
  render() {
    return (
      <div style={{ flex: 1 }}>
        <GoogleMaps isMarkerShown />
      </div>
    );
  }
}
