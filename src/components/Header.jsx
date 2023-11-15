import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";


function Header() {
    
    const location = useLocation();
    const appContext = useContext(AppContext);

    function signOut(){
      localStorage.removeItem('jwt');
      appContext.setIsLogin(false); 
    };

    function handleBurgerClick(){
        const burgerButton = document.querySelector('.header__burger');
        const navBar = document.querySelector('.header__nav_user');
        burgerButton.classList.toggle('header__burger_active');
        navBar.classList.toggle('header__nav_user-active');
    };
   
    return (
        <header className="header"> 
            <a href="#" className="header__logo"></a>
            {appContext.isLogin&&<button className="header__burger" onClick={handleBurgerClick}></button>}
            {appContext.isLogin?
            <nav className="header__nav header__nav_user">
                <NavLink 
                    to={'/'} //путь на основную страницу. Но если добавится елемент пользователя, то путь изменится
                    className={"header__link"}>
                    {appContext.userEmail}
                </NavLink>
                <NavLink 
                    to={'/sign-in'} 
                    className={"header__link"}
                    onClick={signOut}>
                    Выйти
                </NavLink>   
            </nav>
            :
            <nav className="header__nav">
                <NavLink to={location.pathname === '/sign-up'?"/sign-in":'/sign-up'} className={"header__link"}>{location.pathname === '/sign-up'?'Войти':'Регистрация'}</NavLink>
            </nav>}
        </header>
    );
} 

export default Header