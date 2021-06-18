import React from 'react';
import { Link} from 'react-router-dom';

const Register = () => {
       function handleSubmit(evt){
           evt.preventDefault()
       } 
      
      return (
        <div className ='register'>
          <h3 className='register__info'>Регистрация</h3>
          <form onSubmit={handleSubmit} className ='register__form'>
          <input required  name="email" type="email" className='register__input'placeholder='Email' 
          // value={values.email || ''}
          />
          <input required  name="password" type="password"  className='register__input'placeholder='Пароль'
          // value={values.password || ''}
          />
            <button type="submit" className="register__button"> Зарегистрироваться </button>
        </form>
        <p className="register__paragraph">Уже зарегистриваны? <Link className='register__link' to="/sing-in"> Войти </Link></p>
      </div>
      )
}

export default Register;

