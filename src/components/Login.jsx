import React, {useState, useContext, useEffect} from 'react';
import {  useNavigate} from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import * as auth from '../auth';

const Login = () => {

  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });
  
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token){
          setFormValue({email: '', password: ''});
          appContext.setIsLogin(true);
          appContext.setUserEmail(formValue.email);
          navigate('/', {replace: true});
        }
      })
      .catch(err => console.log(err));
  };
 
    return(
      <div className="login">
        <h2 className="login__title">
          Вход
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
          <button type="submit" className="login__button">Войти</button>
        </form>
      </div>
    )
  };

export default Login;