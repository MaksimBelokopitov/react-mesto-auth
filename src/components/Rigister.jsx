import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import * as auth from '../auth.js';
import InfoTooltip from './InfoTooltip.jsx';

const Register = () => {

  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isRegOk, setIsRegOk] = useState(false);

  function handleInfoOpen() {
    setIsInfoPopupOpen(true);
  };

  function handleInfoClose() {
    setIsInfoPopupOpen(false);
    {isRegOk && navigate('/sign-in', {replace: true})};
    setIsRegOk(false);
  };

  function handleRegOk() {
    setIsRegOk(true);
  };

  const [formValue, setFormValue] = useState({
    email:'',
    password:'',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {  password, email } = formValue;
    auth.register(password, email)
    .then((res) => {
      handleInfoOpen();
      handleRegOk();
    })
    .catch(() => {
      handleInfoOpen();
    });
  };
     
return(
    <div className="login">
      <InfoTooltip isOpen={isInfoPopupOpen} isClose={handleInfoClose} isRegOk={isRegOk}/>
      <h2 className="login__title">
        Регистрация
      </h2>
      <form onSubmit={handleSubmit} className="login__form">
        <input 
          className="login__input"
          required
          id="email"
          name="email"
          type="text"
          placeholder='Email'
          value={formValue.email}
          onChange={handleChange}
         />
        <input 
          className="login__input"
          required 
          id="password"   
          name="password" 
          type="password"
          placeholder='Пароль'
          value={formValue.password}
          onChange={handleChange}  
        />
        <button type="submit" className="login__button">Зарегистрироваться</button>
      </form>
      <div className="login__signin">
        <p className='login__subtitle'>Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link></p>
      </div>
    </div>
  )
}
  
export default Register;