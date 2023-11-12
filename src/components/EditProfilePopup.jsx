import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../context/AppContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({isOpen, onUpdateUser}){

  const {values, handleChange, setValues} = useForm({
    name:'',
    about: '',
  });

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
  } 

  return(
    <PopupWithForm 
      name = {'profile'} 
      title = {'Редактирование профиля'} 
      buttonText ={appContext.isLoading ? 'Сохранение...' : 'Сохранить'} 
      isOpen ={isOpen} 
      onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_user-name"
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
        <span className="popup__error input-profile-name-error" ></span>
      </label>
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_user-job"
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
        <span className="popup__error input-profile-job-error" ></span>
      </label>
    </PopupWithForm>
    );
};

export default EditProfilePopup