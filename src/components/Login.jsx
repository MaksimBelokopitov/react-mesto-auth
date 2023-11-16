import React, {useState, useContext} from 'react';
import {  useNavigate} from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import * as auth from '../auth';
import AuthForm from './AuthForm';

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
      <main className="login">
        <h2 className="login__title">
          Вход
        </h2>
        <AuthForm 
          formValue={formValue} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
          buttonText = {'Войти'} />
      </main>
    )
  };

export default Login;