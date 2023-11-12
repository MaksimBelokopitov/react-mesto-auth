import { useEffect, useContext} from "react";
import { AppContext } from "../context/AppContext";


function ImagePopup({card, isOpen}) {

  const appContext = useContext(AppContext)
  const popupClose = appContext.closeAllPopups;

    return(
      <div onClick={e => (e.currentTarget === e.target) && popupClose()} className={`popup popup_high-opacity popup_type_figure ${isOpen? 'popup_opened' : ''}`}>
        <figure className="popup__figure">
          <button className="popup__button-close popup__button-close_figure popup__button-close_type_figure" onClick={popupClose}></button>
          <img  className="popup__figure-image" src={card ?card.link : ''} alt={card ? card.name : ''}/>
          <figcaption className="popup__figure-subtitle">{card? card.name : ''}</figcaption>
        </figure>
      </div>
    );
  };

export default ImagePopup