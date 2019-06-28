import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function CityCard({ name, toggleFavorite, isFavorite }) {
  return (
    <div className="cityCard">
      <p>{name}</p>
      <p>pic</p>
      <p>20C</p>
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
