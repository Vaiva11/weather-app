import React from "react";
import "./index.scss";
import { CityCard } from "../../components";

function Favorites({ cities, toggleFavorite }) {
  const cards = [];
  Object.keys(cities).forEach(key => {
    let value = cities[key];
    if (value.isFavorite) {
      cards.push(
        <CityCard name={key} {...value} toggleFavorite={toggleFavorite} />
      );
    }
  });

  return <div className="favorites">{cards}</div>;
}

Favorites.defaultProps = {
  cities: {}
};

export default Favorites;
