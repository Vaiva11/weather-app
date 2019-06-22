import React from 'react';
import "./index.scss";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
    </header>
  )
}

export default Header;