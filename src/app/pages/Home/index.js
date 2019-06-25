import React from "react";
import "./index.scss";
import Select from "react-select";
import { CityCard } from "../../components";

function Home({ cities, toggleFavorite, countries }) {
  const cards = [];
  let countriesOptions = [];

  //makes select countries
  Object.keys(countries).forEach((i, index) => {
    countriesOptions.push({ label: i, value: Object.values(countries)[index] });
  });

  //makes cities
  Object.keys(cities).forEach(key => {
    let value = cities[key];
    cards.push(
      <CityCard name={key} {...value} toggleFavorite={toggleFavorite} />
    );
  });

  return (
    <div className="home">
      <div className="home--list">
        <h1>Choose country</h1>
        <Select options={countriesOptions} className="selector" />
      </div>
      <div className="home--map">MAP</div>
      <div className="home--cities">{cards}</div>
    </div>
  );
}

Home.defaultProps = {
  cities: {}
};

export default Home;
