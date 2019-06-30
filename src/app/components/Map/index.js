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
    let left = 180;
    let right = -180;
    let top = -180;
    let bottom = 180;

    Object.keys(cities).forEach((i, index) => {
      let value = cities[i];

      if (value.icon) {
        left = left > value.lng ? value.lng : left;
        right = right < value.lng ? value.lng : right;
        top = top < value.lat ? value.lat : top;
        bottom = bottom > value.lat ? value.lat : bottom;

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

    //console.log(`Left:${left} Right:${right} Top:${top} Bottom:${bottom}`);
    let bounds = new this.props.google.maps.LatLngBounds();
    bounds.extend({ lat: parseFloat(top), lng: parseFloat(left) });
    bounds.extend({ lat: parseFloat(bottom), lng: parseFloat(left) });
    bounds.extend({ lat: parseFloat(top), lng: parseFloat(right) });
    bounds.extend({ lat: parseFloat(bottom), lng: parseFloat(right) });

    const { mineLat, mineLng } = this.state;
    this.getLocation();
    let map = (
      <Map
        google={this.props.google}
        initialCenter={{ lat: mineLat, lng: mineLng }}
        bounds={bounds}
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
