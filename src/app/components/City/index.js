import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function CityCard({ name, temperature, toggleFavorite, isFavorite }) {
  return (
    <div className="cityCard">
      <p>City: {name}</p>
      <p>Temperature: {temperature}</p>
      <p>
        <button type="button" onClick={() => toggleFavorite(name)}>
          {isFavorite ? "💔" : "💖"}
        </button>
      </p>
    </div>
  );
}

CityCard.propTypes = {
  name: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired
};

export default CityCard;
