import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import "./index.scss";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mineLat: null,
      mineLng: null
    };
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.setState({ mineLat: 51.5074 });
      this.setState({ mineLng: 0.1278 });
      console.log("Geolocation is not supported by this browser.");
    }
  };

  showPosition = position => {
    this.setState({ mineLat: position.coords.latitude });
    this.setState({ mineLng: position.coords.longitude });
  };

  render() {
    this.getLocation();
    const { mineLat, mineLng } = this.state;
    console.log(mineLat, mineLng);
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{
          lat: mineLat,
          lng: mineLng
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBnxtc9KFJvG1vzPxh55D3Rs5SXHEypnKU"
})(MapContainer);
