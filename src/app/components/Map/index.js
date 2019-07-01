import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import "./index.scss";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  };

  showPosition = position => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        position.coords.latitude
      },${
        position.coords.longitude
      }1&key=AIzaSyBnxtc9KFJvG1vzPxh55D3Rs5SXHEypnKU`
    )
      .then(res => res.json())
      .then(data => {
        if (!data || !data.results) {
          return;
        }

        data.results.map(component => {
          let addresses = component.address_components;
          if (!addresses) {
            return null;
          }

          return addresses.map(address => {
            if (address.long_name && address.types && address.short_name) {
              if (address.types.indexOf("country") > -1) {
                this.props.parentCallback(
                  address.long_name,
                  address.short_name
                );
              }
            }

            return null;
          });
        });
      });
  };

  componentDidMount() {
    this.getLocation();
  }

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
            key={value.lat}
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

    let bounds = new this.props.google.maps.LatLngBounds();
    bounds.extend({ lat: parseFloat(top), lng: parseFloat(left) });
    bounds.extend({ lat: parseFloat(bottom), lng: parseFloat(left) });
    bounds.extend({ lat: parseFloat(top), lng: parseFloat(right) });
    bounds.extend({ lat: parseFloat(bottom), lng: parseFloat(right) });

    let map = (
      <Map google={this.props.google} bounds={bounds}>
        {markers}
      </Map>
    );
    return map;
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBnxtc9KFJvG1vzPxh55D3Rs5SXHEypnKU"
})(MapContainer);
