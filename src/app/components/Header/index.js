import React from 'react';
import "./index.scss";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <ul className='header__nav'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </header>
  )
}

export default Header;