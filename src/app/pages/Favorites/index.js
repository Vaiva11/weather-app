import React from "react";
import "./index.scss";
import { CityCard } from "../../components";

function Favorites({ favCities, toggleFavorite }) {
  const cards = [];

  favCities.map(city => {
    cards.push(
      <CityCard
        key={city.name} //kad nebutu error
        name={city.name}
        title={city.name + ", " + city.countryCode}
        icon={city.icon}
        temperature={city.temperature}
        isFavorite={true}
        toggleFavorite={toggleFavorite}
      />
    );

    return "";
  });

  const nameList =
    cards.length !== 0 ? (
      <div className="cardsName">
        <p>City</p>
        <p>Weather</p>
        <p>Celsius</p>
        <p>Remove from favorites</p>
      </div>
    ) : (
      <p className="empty">You do not have any favorite cities</p>
    );

  return (
    <div className="favorites">
      {nameList}
      <div className="home">
        <div className="homeInline">
          <div className="homeInline--item">{cards}</div>
        </div>
      </div>
    </div>
  );
}

Favorites.defaultProps = {
  cities: {}
};

export default Favorites;
