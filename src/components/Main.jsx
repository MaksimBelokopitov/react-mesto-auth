import { useContext} from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({
    onEditProfile, 
    onAddPlace,
    onEditAvatar, 
    onCardClick, 
    cards,
    onCardLike, 
    onCardDelete
}) {
   
    const user = useContext(CurrentUserContext);
 
    return(
        <main className="main">
            <section className="profile">
                <div className="profile__images" onClick={onEditAvatar}>
                    <img alt="Фото профиля" className="profile__avatar" src={user.avatar} />
                </div>
                <div className="profile__info">
                    <div className="profile__top-row">
                        <h1 className="profile__name">{user.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__job">{user.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="mesto">
                <ul  className="mesto__list">
                    {cards.map((item) => (
                      <Card 
                        key={item._id} 
                        card={item} 
                        onCardClick={onCardClick} 
                        onCardLike={onCardLike} 
                        onCardDelete={onCardDelete}  />   
                    ))
                    };
                </ul>
             </section>
            </main>
    );
};

export default Main