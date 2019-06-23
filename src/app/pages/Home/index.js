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

  return (
    <div className="home">
      <div className="home--list">
        <h1>Choose country</h1>
        <Select options={countries} className="selector" />
      </div>
      <div className="home--map">MAP</div>
      <div className="home--cities">
        {cities.map(city => (
          <CityCard {...city} toggleFavorite={toggleFavorite} />
        ))}
      </div>
    </div>
  );
}

Home.defaultProps = {
  cities: []
};

export default Home;
