import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import React, {useState, useEffect}  from 'react';
import EditProfilePopup from "./components/EditProfilePopup";
import AddPlacePopup from "./components/AddPlacePopup";
import EditAvatarPopup from "./components/EditAvatarPopup";
import ImagePopup from "./components/ImagePopup";
import api from "./utils/Api";
import { CurrentUserContext } from "./context/CurrentUserContext";
import { AppContext } from "./context/AppContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Rigister";
import ProtectedRouteElement from "./components/ProtectedRouteElement";
import * as auth from './auth';

function App() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
 
  useEffect(() =>{
    handleTokenCheck();
    api.getPageData()
    .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
    })
    .catch((err) => {
      console.log(`Ошибка.....: ${err}`);
    });
  },[]);

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
      .then((res) => {
        if (res){
          setUserEmail(res.data.email);
          setIsLogin(true);
          navigate("/", {replace: true})
        };
      });  
    };
  };
  
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
    setSelectedCard({});
  };

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopup;

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { 
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])
 
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
     setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setIsImagePopup(true);
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
  
    api.changeLikeStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(`Ошибка.....: ${err}`);
    });
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() =>{
      setCards((state) => state.filter((item) => item._id !== card._id)); 
    })
    .catch((err) => {
      console.log(`Ошибка.....: ${err}`);
    });
  }

  function handleUpdateUser(param){
    setIsLoading(true)
    api.setUserInfo(param)
    .then((data) =>{
      setCurrentUser(data);
      closeAllPopups()
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() =>setIsLoading(false))
  };

  function handleUpdateAvatar(param) {
    setIsLoading(true)
    api.setUserAvatar(param)
    .then((data) =>{
      setCurrentUser(data);
      closeAllPopups()
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() =>setIsLoading(false))
  };

  function handleAddPlace(param){
    setIsLoading(true)
    api.createNewCard(param)
    .then((data) => {
      setCards([data, ...cards])
      closeAllPopups()
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() =>setIsLoading(false))
  }
    
  return (
    <AppContext.Provider value={
      {isLoading, 
      closeAllPopups, 
      isLogin, 
      setIsLogin, 
      userEmail, 
      setUserEmail}}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="App">
          <Header />
          <Routes>
          <Route 
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={handleCardClick} 
                cards = {cards}
                onCardLike = {handleCardLike}
                onCardDelete = {handleCardDelete}
              />
            } 
          />
          <Route path="sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />}/>
          </Routes>
          {isLogin&&<Footer />}
          {isLogin&&<EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser}/>}
          {isLogin&&<AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlace} />}
          {isLogin&&<EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} />}
          {isLogin&&<ImagePopup   card={selectedCard} isOpen={isImagePopup} />}
        </div>  
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
};

export default App;

     
 