import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

export const GoogleMaps = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAjbF8WHFQLrtxMn6IfSXuZIA39hL8QteQ",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 43.257955, lng: -79.922199 }}
  >
    {props.isMarkerShown && (
      <Marker position={{ lat: 43.257955, lng: -79.922199 }} />
    )}
  </GoogleMap>
));
