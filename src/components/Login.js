import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory  } from 'react-router-dom'
import { userContext } from './UserContext'
import style from './styles/Login.module.css'


export const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { login, isLogin } = useContext(userContext);
  let history = useHistory();

  const handleForm = (event) => {
    event.preventDefault()
    login(user.email, user.password)
  }

  const handleChangeUser = ({ name, value }) => {
    setUser({ ...user, [name]: value })
  }

  useEffect(()=>{
    if(isLogin())history.push('/')

  },)

  return (
    <form
      className={style.formulario}
      onSubmit={handleForm}
      onChange={({ target }) => handleChangeUser(target)}>
        <label className={style.label}>
          Email
          <input className={style.input} type='email' name='email' value={user.email} />
        </label>
        <label className={style.label}>
          Contraseña
          <input className={style.input} type="password" name='password' value={user.password} />
        </label>

        <input className={style.button} type='submit' value="Ingresar" />
        <Link to={'/create'}>Crear cuenta</Link>
    </form>
  )
}
