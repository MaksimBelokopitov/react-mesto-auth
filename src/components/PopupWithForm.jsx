import { AppContext } from "../context/AppContext";
import { useContext } from "react";

function PopupWithForm({name, title, children, buttonText, isOpen, onSubmit}){
    
    const appContext = useContext(AppContext)
    const popupClose = appContext.closeAllPopups;

   
    return(
        <div onClick={e => (e.currentTarget === e.target) && popupClose()} className= {`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__button-close" type="button" onClick={popupClose} />
                <h2 className='popup__title'>{title}</h2>
                <form 
                    action="submit" 
                    className={`popup__form popup__form_type_${name}`} 
                    name={name}
                    onSubmit={onSubmit}
                >
                        {children}
                        <button className="popup__button" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm