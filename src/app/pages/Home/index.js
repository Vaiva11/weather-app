import React from "react";
import "./index.scss";
import Select from "react-select";
import { CityCard } from "../../components";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: {},
      countries: [],
      toggleFavorite: false,
      selectedOption: null
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.parentCallback(selectedOption);
  };

  render = () => {
    const { countries, cities, toggleFavorite, favCities } = this.props;
    const { selectedOption } = this.state;

    const cards = [];
    let countriesOptions = [];

    //makes select countries
    Object.keys(countries).forEach((i, index) => {
      countriesOptions.push({
        label: i,
        value: Object.values(countries)[index]
      });
    });

    //makes cities
    Object.keys(cities).forEach(key => {
      let value = cities[key];

      let isFavorite = false;
      for (let index = 0; index < favCities.length; index++) {
        if (
          favCities[index].name === key &&
          favCities[index].countryCode === value.countryCode
        ) {
          isFavorite = true;
          break;
        }
      }

      cards.push(
        <CityCard
          key={key} //kas nebutu error
          name={key}
          {...value}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      );
    });

    //makes list alphabetic
    countriesOptions.sort((a, b) => (a.label > b.label ? 1 : -1));

    const nameList =
      cards.length !== 0 ? (
        <div className="home--name">
          <p>City</p>
          <p>Weather</p>
          <p>Celsius</p>
          <p>Add to favorites</p>
        </div>
      ) : (
        <span />
      );

    //rendering
    return (
      <div className="home">
        <div className="home--list">
          <h1>Choose country</h1>
          <Select
            options={countriesOptions.sort()}
            value={selectedOption}
            onChange={this.handleChange}
            className="selector"
          />
        </div>
        <div className="home--map">MAP</div>
        {nameList}
        <div className="home--item">{cards}</div>
      </div>
    );
  };
}

export default Home;
