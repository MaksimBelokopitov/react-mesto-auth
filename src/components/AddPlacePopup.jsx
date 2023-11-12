import { useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";
import { AppContext } from "../context/AppContext";

function AddPlacePopup({isOpen, onAddPlace}) {

  const appContext = useContext(AppContext);
  const {values, handleChange, setValues} = useForm({
    name:'',
    link: '',
  });

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
    })
  }
    return (
        <PopupWithForm 
          name = {'mesto'} 
          title = {'Новое место'} 
          buttonText ={appContext.isLoading ? 'Сохранение...' : 'Сохранить'} 
          isOpen ={isOpen} 
          onSubmit={handleAddPlaceSubmit}>
            <label className="popup__form-field">
            <input
              className="popup__input popup__input_type_mesto-name"
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
            <span className="popup__error input-mesto-name-error" ></span>
          </label>
          <label className="popup__form-field">
            <input
              className="popup__input popup__input_type_mesto-image"
              type="url"
              value={values.link ?? ''}
              onChange={handleChange}
              name="link"
              placeholder="Ссылка на картинку"
              required
              id="input-mesto-image"
            />
            <span className="popup__error input-mesto-image-error" ></span>
          </label>
        </PopupWithForm>
    );
};

export default AddPlacePopup