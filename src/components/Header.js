import React from 'react';
import logo from '../images/header-logo.svg';

function Header() {
  return (
      <header className="header page__content">
        <img src={logo} alt="логотип Mesto Russia" className="header__logo"/>
      </header>
  )
}

export default Header;