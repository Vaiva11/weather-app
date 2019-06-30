import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
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
      this.setState({ mineLat: 51.5074 }); //London
      this.setState({ mineLng: 0.1278 });
      console.log("Geolocation is not supported by this browser.");
    }
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.parentCallback(selectedOption);
  };

  showPosition = position => {
    this.setState({ mineLat: position.coords.latitude });
    this.setState({ mineLng: position.coords.longitude });
  };

  render() {
    const { cities } = this.props;

    let markers = [];

    Object.keys(cities).forEach((i, index) => {
      let value = cities[i];

      if (value.icon) {
        markers.push(
          <Marker
            position={{ lat: value.lat, lng: value.lng }}
            options={{
              icon: {
                url: `http://openweathermap.org/img/wn/${value.icon}@2x.png`,
                scaledSize: { width: 32, height: 32 }
              }
            }}
          />
        );
      }
    });

    const { mineLat, mineLng } = this.state;
    this.getLocation();
    let map = (
      <Map
        google={this.props.google}
        zoom={5}
        initialCenter={{
          lat: mineLat,
          lng: mineLng
        }}
      >
        {markers}
      </Map>
    );
    return map;
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBnxtc9KFJvG1vzPxh55D3Rs5SXHEypnKU"
})(MapContainer);
