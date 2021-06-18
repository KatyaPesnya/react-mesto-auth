import React from 'react';
import logo from '../images/header-logo.svg';
import {NavLink, useLocation} from 'react-router-dom';

function Header({loggedIn}) {

  const location = useLocation();

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  function handleToggleMenu() {
    setMenuIsOpen(!menuIsOpen)
  }

  function handleSingOut(){
    setMenuIsOpen(false)
    // onSingOut()
  }
  return (

      <header className={loggedIn ? 'header header_row-reverse page__content': 'header page__content'}>
            {/* <img src={logo} alt="логотип Mesto Russia" className="header__logo"/> */}
        {loggedIn &&
        (
          <div className={menuIsOpen ? 'header__container header__container_opened': 'header__container'} >
             <address className="header__address">e-mail</address>
             <button className="header__button" type="button" onClick={handleSingOut}>Выйти</button>
             </div>
             )
}
<div className="header__container-main">
<img src={logo} alt="логотип Mesto Russia" className="header__logo"/>
{loggedIn &&
(<button className={menuIsOpen ? 'header__menu-button header__menu-button_opened' : 'header__menu-button'} type="button" onClick={handleToggleMenu}/>)
}
{!loggedIn &&
(<nav>
{location.pathname === '/sing-in' &&(<NavLink className="header__navlink" to="/sing-up"> Регистрация </NavLink>)}
{location.pathname === '/sing-up' &&(<NavLink className="header__navlink" to="sing-in"> Войти </NavLink>)}
</nav>)
}
</div>
 </header>
  )
}

export default Header;