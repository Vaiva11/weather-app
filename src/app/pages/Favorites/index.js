import React from "react";
import "./index.scss";
import { CityCard } from "../../components";

function Favorites({ cities, toggleFavorite, favorites }) {
  let storedNames = JSON.parse(localStorage.getItem("names"));
  return (
    <div className="favorites">
      {cities.map(city => (
        <CityCard {...city} toggleFavorite={toggleFavorite} />
      ))}
      <p>{storedNames}</p>
    </div>
  );
}

Favorites.defaultProps = {
  cities: []
};

export default Favorites;
