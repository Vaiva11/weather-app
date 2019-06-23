import React from "react";
import "./index.scss";
import { CityCard } from "../../components";

function Favorites({ favCities, toggleFavorite }) {
  return (
    <div className="favorites">
      {favCities.map(city => (
        <CityCard {...city} toggleFavorite={toggleFavorite} />
      ))}
    </div>
  );
}

Favorites.defaultProps = {
  favCities: []
};

export default Favorites;
