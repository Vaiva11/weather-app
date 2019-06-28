import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function CityCard({ name, icon, temperature, toggleFavorite, isFavorite }) {
  let iconImg = "";

  if (icon !== undefined) {
    fetch(`https://openweathermap.org/img/wn/${icon}.png`)
      .then(res => {
        return res.blob();
      })
      .then(blob => {
        iconImg = URL.createObjectURL(blob);
        // Do whatever with the img
        console.log(iconImg);
      });
  }

  return (
    <div className="cityCard">
      <p>{name}</p>
      <p>{icon}</p>
      <p>{temperature}</p>
      <p>
        <button
          type="button"
          className="cityCard--favorite"
          onClick={() => toggleFavorite(name)}
        >
          {isFavorite ? "❌ " : "❤️"}
        </button>
      </p>
    </div>
  );
}

CityCard.propTypes = {
  name: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired
};

export default CityCard;
