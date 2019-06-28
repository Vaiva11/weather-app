import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function CityCard({ name, icon, temperature, toggleFavorite, isFavorite }) {
  let iconImg = "";
  let tempImg = temperature ? temperature : "―";

  if (icon !== undefined) {
    switch (icon) {
      case "01d":
        iconImg = "☀️";
        break;

      case "02d":
      case "02n":
      case "03d":
      case "04d":
      case "50d":
      case "03n":
      case "04n":
      case "50n":
        iconImg = "☁️ ";
        break;

      case "09d":
      case "10d":
      case "09n":
      case "10n":
        iconImg = "💧 ";
        break;

      case "11d":
      case "11n":
        iconImg = "⚡️";
        break;

      case "13d":
      case "13n":
        iconImg = "❄️";
        break;

      case "01n":
        iconImg = "🌙";
        break;

      default:
        iconImg = "";
    }
  } else {
    iconImg = "―";
  }

  return (
    <div className="cityCard">
      <p>{name}</p>
      <p>{iconImg}</p>
      <p>{tempImg}</p>
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
