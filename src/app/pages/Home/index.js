import React from "react";
import "./index.scss";
import Select from "react-select";
import { CityCard } from "../../components";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      error: null
    };
  }

  // componentDidMount() {
  //   fetch(
  //     "api.openweathermap.org/data/2.5/weather?q={city name},{country code}"
  //   )
  //     .then(response => response.json())
  //     .then(json => {
  //       const cities = json.map(cities => ({
  //         ...cities
  //       }));
  //       this.setState({ cities });
  //     })
  //     .catch(() => this.setState({ error: "Something went wrong" }));
  // }

  render() {
    const countries = [
      {
        label: "Lithuania",
        value: 1
      },
      {
        label: "Latvia",
        value: 2
      },
      {
        label: "Estonia",
        value: 3
      },
      {
        label: "Poland",
        value: 4
      }
    ];

    const cities = [
      {
        name: "Vilnius",
        temperature: 1
      },
      {
        name: "Kaunas",
        temperature: 2
      },
      {
        name: "Siauliai",
        temperature: 3
      },
      {
        name: "Varena",
        temperature: 4
      }
    ];

    return (
      <div className="home">
        <div className="home--list">
          <h1>Choose country</h1>
          <Select options={countries} className="selector" />
        </div>
        <div className="home--map">MAP</div>
        <div className="home--cities">
          {cities.map(city => (
            <CityCard
              {...city}
              // toggleFavorite={toggleFavorite}
              // updateCartCount={updateCartCount}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
