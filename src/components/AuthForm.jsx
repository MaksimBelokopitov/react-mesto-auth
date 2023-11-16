import { Link } from "react-router-dom"

const AuthForm = ({formValue, handleChange, handleSubmit, buttonText }) => {
    return(
        <form onSubmit={handleSubmit} className="login__form">
          <input 
            className="login__input"
            required 
            id="email" 
            name="email" 
            type="text" 
            placeholder='Email'
            value={formValue.email}
            onChange={handleChange}
           />
          <input 
            className="login__input"
            required 
            id="password"   
            name="password" 
            type="password"
            placeholder='Пароль'  
            value={formValue.password}
            onChange={handleChange}
          />
          <button type="submit" className="login__button">{buttonText}</button>
          {buttonText === 'Зарегистироваться' && <div className="login__signin">
            <p className='login__subtitle'>Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link></p>
            </div>}
        </form>
    )
}

export default AuthForm