import React from "react";
import "./index.scss";
import { CityCard } from "../../components";

function Favorites({ cities, toggleFavorite }) {
  return (
    <div className="favorites">
      {cities.map(city => (
        <CityCard {...city} toggleFavorite={toggleFavorite} />
      ))}
    </div>
  );
}

Favorites.defaultProps = {
  cities: []
};

export default Favorites;
