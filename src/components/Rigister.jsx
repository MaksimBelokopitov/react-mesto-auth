import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../auth.js';
import InfoTooltip from './InfoTooltip.jsx'; 
import AuthForm from './AuthForm.jsx';


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
    .catch((err) => {
      console.log(`Ошибка.....: ${err}`);
      handleInfoOpen();
    });
  };
     
return(
    <main className="login">
      <InfoTooltip isOpen={isInfoPopupOpen} isClose={handleInfoClose} isRegOk={isRegOk}/>
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