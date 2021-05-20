import React, {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [cards, setCards] = useState([])
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
        .catch((err) => {
          console.log(err);
        })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
        .then(()=> {
          setCards((state)=> state.filter((c) => c !== card))
        })
        .catch((err) => {
          console.log(err);
        })
  }
  function handleAddPlaceSubmit(data){
    api.createCard(data)
        .then((newCard)=> {
          setCards([newCard, ...cards])
          closeAllPopups()
        })
        .catch((err) => {
          console.log(err);
        })
  }
  React.useEffect(() => {
    api.getCards()
        .then((data) => {
          setCards(data)
        })
        .catch((err) => {
          console.log(err);
        })
  }, [])

  React.useEffect(() => {
    api.getUserInfo()
        .then((data) => {
          setCurrentUser(data)
        })
        .catch((err) => {
          console.log(err);
        })
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }
  function handleUpdateUser(data){
    api.setUserInfo(data)
        .then((data)=> {
          setCurrentUser(data);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
        })

}
  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
        .then((data) => {
              setCurrentUser(data);
              closeAllPopups();
            })
        .catch((err) => {
          console.log(err);
        })

  }
  return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="root">
          <div className="page">
            <Header/>
            <Main
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}

            />
            <Footer/>
          </div>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
          <PopupWithForm   name="delete-card" title="Вы уверены?" submitText="Да"/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </div>
      </div>
</CurrentUserContext.Provider>
  );
}

export default App;
