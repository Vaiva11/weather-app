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
    const { countries } = this.props;
    const { cities } = this.props;
    const { toggleFavorite } = this.props;

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
      cards.push(
        <CityCard name={key} {...value} toggleFavorite={toggleFavorite} />
      );
    });

    //makes list alphabetic
    countriesOptions.sort((a, b) => (a.label > b.label ? 1 : -1));

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
        <div className="home--cities">{cards}</div>
      </div>
    );
  };
}

export default Home;
