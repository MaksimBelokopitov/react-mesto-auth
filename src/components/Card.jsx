import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";


function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const user = useContext(CurrentUserContext);
  
  const isOwn = card.owner._id === user._id;
  const isLiked = card.likes.some(i => i._id === user._id);


  const cardLikeButtonClassName = (`mesto__like-button ${isLiked && 'mesto__like-button_active'}` 
  );

  

  function handleClick() {
   onCardClick(card);
  };

  function handleLikeCard(){
    onCardLike(card);
  };

  function handleCardDelete(){
    onCardDelete(card);
  };

  return(
    <li className="mesto__item">
      {isOwn&&<button className="mesto__delete-button" onClick={handleCardDelete}></button>}
      <img className="mesto__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="mesto__content">
        <h2 className="mesto__title">{card.name}</h2>
        <div className="mesto__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeCard} type="button"></button>
          <p className="mesto__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};

export default Card
