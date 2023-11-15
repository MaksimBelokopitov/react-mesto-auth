import { useEffect} from "react";
import regOk from "../images/regok.svg";
import regNot from "../images/regnot.svg";

const InfoTooltip = ({ isOpen, isClose, isRegOk}) => {
    
const popupClose = isClose;

useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        popupClose();
      }
    };
    if(isOpen) { 
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    };
  }, [isOpen]);

    return(
        <div onClick={e => (e.currentTarget === e.target) && popupClose()} className= {`popup ${isOpen? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_info">
                <button className="popup__button-close" type="button" onClick={popupClose} />
                <img className="popup__image" src={isRegOk ? regOk : regNot} 
                    alt={isRegOk ? "Вы успешно зарегистрировались!" 
                    : "Что-то пошло не так!Попробуйте ещё раз."}/>
                <p className="popup__subtitle">
                    {isRegOk ? "Вы успешно зарегистрировались!"
                    : "Что-то пошло не так!Попробуйте ещё раз."}
                </p>
            </div>    
        </div>
    )
};

export default InfoTooltip