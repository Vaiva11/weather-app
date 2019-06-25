import React from "react";
import "./index.scss";
import Select from "react-select";
import { CityCard } from "../../components";

function Home({ cities, toggleFavorite }) {
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

  const cards = [];
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
        <Select options={countries} className="selector" />
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
