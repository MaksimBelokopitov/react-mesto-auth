import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";


function EditAvatarPopup({isOpen, onUpdateAvatar}) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();
  
  useEffect(() => {
    setValues({
      avatar: ''})
  }, [isOpen]); 
  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: values.avatar
    });
    resetForm();
  } 
    return(
        <PopupWithForm 
          name = {'avatar'} 
          title = {'Обновить аватар'} 
          buttonText ={'Сохранить'} 
          isOpen ={isOpen}
          onSubmit={handleSubmit}
          isValid = {isValid}>
            <label className="popup__form-field">
            <input
              className={`popup__input ${!isValid && "popup__input_type_error"}`}
              value={values.avatar ?? ''}
              onChange={handleChange}
              type="url"
              name="avatar"
              placeholder="Ссылка на картинку"
              required
              id="input-profile-avatar"
            />
            <span className={`popup__error popup__error ${!isValid && "popup__error_visible"}`}>{errors.avatar}</span>
          </label>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;