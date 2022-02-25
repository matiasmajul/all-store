import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2'

import {  addDoc,  collection} from 'firebase/firestore';
import { db } from '../firebase/firebase';

import style from './styles/CreateAccount.module.css'

export const CreateAccount = () => {
  const [user, setUser] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  })
  const [isSubmitDisable, setIsSubmitDisable] = useState(true)
  let history = useHistory();

  const handleChangeUser = ({ name, value }) => {
    setUser({ ...user, [name]: value })
  }

  const handleForm = (event) => {
    event.preventDefault()

    const createProduct = async () => {
      await addDoc(collection(db, 'users'), user)
    };
    createProduct();
    Swal.fire({
      icon: 'success',
      title: 'Usuario creado',
      showConfirmButton: false,
      timer: 1000
    })
    history.push('/login')
  }
  
  useEffect(() => {
    const userKeys = Object.keys(user);
    const isSomeUserPropEmpty = userKeys.some((key) => user[key] === '')
    setIsSubmitDisable(isSomeUserPropEmpty)
  }, [user])

  return (
    <form
      className={style.formulario}
      onSubmit={handleForm}
      onChange={({ target }) => handleChangeUser(target)}
    >
      <label className={style.label}>
        Nombre
        <input type="text" className={style.input} name='name' value={user.name} />
      </label>
      <label className={style.label}>
        Teléfono
        <input type="number" className={style.input} name='phone' value={user.phone} />
      </label>
      <label className={style.label}>
        Email
        <input type="email" className={style.input} name='email' value={user.email} />
      </label>
      <label className={style.label}>
        Repetir email
        <input type="email" className={style.input} name='repeat-email' pattern={user.email}  />
      </label>
      <label className={style.label}>
        Contraseña
        <input type="password" className={style.input} name='password' value={user.password} minlength='6' pattern="[A-Za-z0-9]+" 
         />
      </label>
      <input className={style.button} type='submit' disabled={isSubmitDisable} value="Crear usuario" />
    </form>

  )
}
