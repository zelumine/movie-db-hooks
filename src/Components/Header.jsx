import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <div className="Header">
      <NavLink exact to="/">
        <p id="logo">MovieDB <i className="fa-solid fa-film"></i></p>
      </NavLink>
    </div>
  )
}

export default Header;
