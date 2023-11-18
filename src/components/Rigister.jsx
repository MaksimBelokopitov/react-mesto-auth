import React, { useState } from 'react';
import * as auth from '../auth.js';
import AuthForm from './AuthForm.jsx';

const Register = ({handleInfoOpen, handleRegOk}) => {

  const [formValue, setFormValue] = useState({
    email:'',
    password:'',
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

    const {  password, email } = formValue;
    auth.register(password, email)
    .then((res) => {
      handleInfoOpen();
      handleRegOk();
    })
    .catch((err) => {
      console.log(`Ошибка.....: ${err}`);
      handleInfoOpen();
    });
  };
     
return(
    <main className="login">
      <h2 className="login__title">
        Регистрация
      </h2>
      <AuthForm 
        formValue={formValue} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
        buttonText = {'Зарегистироваться'} />
    </main>
  )
}
  
export default Register;