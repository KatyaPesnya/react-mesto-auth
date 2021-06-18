import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Login = () => {

    function handleSubmit(evt) {
        evt.preventDefault();
        
      }
      return (
        <div className ='login'>
          <h3 className='login__info'>Вход</h3>
          <form onSubmit={handleSubmit} className ='login__form'>
          <input required  name="email" type="email" className='login__input'placeholder='Email'/>
          <input required  name="password" type="password"  className='login__input'placeholder='Пароль'/>
            <button type="submit" className="login__button"> Войти </button>
        </form>
      </div>
      )
}

export default Login;