import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({isOpen, onUpdateAvatar}) {

  const avatarRef = useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 
    return(
        <PopupWithForm 
          name = {'avatar'} 
          title = {'Обновить аватар'} 
          buttonText ={'Сохранить'} 
          isOpen ={isOpen}
          onSubmit={handleSubmit}>
            <label className="popup__form-field">
            <input
              className="popup__input popup__input_type_avatar"
              ref={avatarRef}
              type="url"
              name="avatar"
              placeholder="Ссылка на картинку"
              required
              id="input-profile-avatar"
            />
            <span className="popup__error input-avatar-error" ></span>
          </label>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;