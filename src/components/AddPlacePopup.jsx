import { useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { AppContext } from "../context/AppContext";

function AddPlacePopup({isOpen, onAddPlace}) {

  const appContext = useContext(AppContext);

  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  useEffect(() => {
    setValues({
      name: '',
      about: ''});
  }, [isOpen]); 

  function handleAddPlaceSubmit(e){
    e.preventDefault();
    
    onAddPlace({
      name: values.name,
      link: values.link
    });

    resetForm();
  }
    return (
        <PopupWithForm 
          name = {'mesto'} 
          title = {'Новое место'} 
          buttonText ={appContext.isLoading ? 'Сохранение...' : 'Сохранить'} 
          isOpen ={isOpen} 
          onSubmit={handleAddPlaceSubmit}
          isValid = {isValid}>
            <label className="popup__form-field">
            <input
              className={`popup__input ${!isValid && "popup__input_type_error"}`}
              type="text"
              value={values.name ?? ''}
              onChange={handleChange}
              name="name"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
              id="input-mesto-name"
            />
            <span className={`popup__error popup__error ${!isValid && "popup__error_visible"}`}>{errors.name}</span>
          </label>
          <label className="popup__form-field">
            <input
              className={`popup__input ${!isValid && "popup__input_type_error"}`}
              type="url"
              value={values.link ?? ''}
              onChange={handleChange}
              name="link"
              placeholder="Ссылка на картинку"
              required
              id="input-mesto-image"
            />
            <span className={`popup__error popup__error ${!isValid && "popup__error_visible"}`}>{errors.link}</span>
          </label>
        </PopupWithForm>
    );
};

export default AddPlacePopup