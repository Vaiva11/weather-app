import React from "react";
import "./index.scss";
import { CityCard } from "../../components";

function Favorites({ favCities, toggleFavorite }) {
  const cards = [];
  console.log(favCities);

  favCities.map(city => {
    cards.push(
      <CityCard
        key={city.name} //kas nebutu error
        name={city.name + ", " + city.countryCode}
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
      <div className="home--name">
        <p>City</p>
        <p>Weather</p>
        <p>Celsius</p>
        <p>Remove from favorites</p>
      </div>
    ) : (
      <p>You do not have any favorite cities</p>
    );

  return (
    <div className="favorites">
      {nameList}
      <div className="home--item">{cards}</div>
    </div>
  );
}

Favorites.defaultProps = {
  cities: {}
};

export default Favorites;
