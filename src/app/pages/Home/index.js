import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import Select from "react-select";
import { CityCard, MapContainer } from "../../components";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: {},
      countries: [],
      toggleFavorite: false,
      selectedOption: null,
      country: ""
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });

    this.props.parentCallback(selectedOption);
  };

  callbackFunction = (country, countryCode) => {
    if (this.state.country === country) {
      return;
    }
    this.setState({ country: country });
    this.setState({ countryCode: country });
    this.handleChange({ label: country, value: countryCode });
  };

  render = () => {
    const { countries, cities, toggleFavorite, favCities } = this.props;
    const { selectedOption } = this.state;

    const cards = [];
    let countriesOptions = [];

    Object.keys(countries).forEach((i, index) => {
      countriesOptions.push({
        label: i,
        value: Object.values(countries)[index]
      });
    });

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
          key={key}
          name={key}
          code={selectedOption ? selectedOption.value : null}
          title={key}
          {...value}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      );
    });

    countriesOptions.sort((a, b) => (a.label > b.label ? 1 : -1));

    const nameList =
      cards.length !== 0 ? (
        <div className="cardsName">
          <p>City</p>
          <p>Weather</p>
          <p>Celsius</p>
          <p>Add to favorites</p>
        </div>
      ) : (
        <p>You did not chose any country</p>
      );

    let select = selectedOption ? selectedOption.label : this.state.country;

    return (
      <div className="home">
        <div className="home--list">
          <h1>Choose country</h1>
          <Select
            options={countriesOptions.sort()}
            value={countriesOptions.filter(option => option.label === select)}
            onChange={this.handleChange}
            className="selector"
          />
        </div>

        <div className="homeInline">
          <div className="homeInline--map">
            <MapContainer
              cities={cities}
              parentCallback={this.callbackFunction}
            />
          </div>

          <div className="homeInline--item">
            {nameList}
            {cards}
          </div>
        </div>
      </div>
    );
  };
}

Home.propTypes = {
  favCities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      code: PropTypes.string
    })
  ),
  parentCallback: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired
};

export default Home;
