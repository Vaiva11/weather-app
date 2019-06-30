import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function CityCard({
  name,
  code,
  title,
  icon,
  temperature,
  toggleFavorite,
  isFavorite
}) {
  let iconImg = "";
  let tempImg = temperature ? temperature + "°C" : "―";

  if (icon !== undefined) {
    iconImg = (
      <img
        className="icon--class"
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather"
      />
    );
  } else {
    iconImg = "―";
  }

  return (
    <div className="cityCard">
      <p>{title}</p>
      <p className="icon">{iconImg}</p>
      <p>{tempImg}</p>
      <p>
        <button
          type="button"
          className="cityCard--favorite"
          onClick={() => toggleFavorite(name, code)}
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
