import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
function CityCard({ name, temperature, toggleFavorite, isFavorite }) {
  let favorites = [];
  return (
    <div className="cityCard">
      <p>City: {name}</p>
      <p>Temperature: {temperature}</p>
      <p>
        <button type="button" onClick={() => toggleFavorite(name)}>
          {isFavorite
            ? favorites.push(name) + "💔"
            : favorites.splice(0, 1) + "💖"}
          {localStorage.setItem("myCities", '["aaa", "bbb"]')}
          {console.log('["aaa", "bbb"]')}
        </button>
      </p>
    </div>
  );
}

CityCard.propTypes = {
  name: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  isFavorite: PropTypes.string.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  updateCartCount: PropTypes.func.isRequired
};

export default CityCard;
