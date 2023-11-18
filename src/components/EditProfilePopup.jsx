import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../context/AppContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({isOpen, onUpdateUser}){

  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();
  
  const currentUser = useContext(CurrentUserContext);
  const appContext = useContext(AppContext);
 
  useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about});
  }, [currentUser, isOpen]); 
  
  function handleSubmit(e) {
    e.preventDefault();

   onUpdateUser({
    name: values.name,
    about: values.about
   });

   resetForm();
  } 

  return(
    <PopupWithForm 
      name = {'profile'} 
      title = {'Редактирование профиля'} 
      buttonText ={appContext.isLoading ? 'Сохранение...' : 'Сохранить'} 
      isOpen ={isOpen} 
      onSubmit={handleSubmit}
      isValid = {isValid}
    >
      <label className="popup__form-field">
        <input
          className={`popup__input ${!isValid && "popup__input_type_error"}`}
          type="text"
          value={values.name ?? ''}
          onChange={handleChange}
          name="name"
          placeholder="Введите ваше имя"
          required
          minLength="2"
          maxLength="40"
          id="input-profile-name"
        />
        <span className={`popup__error popup__error ${!isValid && "popup__error_visible"}`} >{errors.name}</span>
      </label>
      <label className="popup__form-field">
        <input
          className={`popup__input ${!isValid && "popup__input_type_error"}`}
          type="text"
          name="about"
          placeholder="Напишите информацию о себе"
          required
          minLength="2"
          maxLength="200"
          id="input-profile-job"
          value={values.about ?? ''}
          onChange={handleChange}
        />
        <span className={`popup__error ${!isValid && "popup__error_visible"}`} >{errors.about}</span>
      </label>
    </PopupWithForm>
    );
};

export default EditProfilePopup