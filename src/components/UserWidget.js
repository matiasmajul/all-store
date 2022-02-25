import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from './UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './styles/UserWidget.module.css';

export const UserWidget = () => {
  const [visible, setVisible] = useState(false)
  const { isLogin, user, closeSession } = useContext(userContext);

  const handleCloseSession = () => {
    closeSession()
  }

  return (
    <div>
      {
        isLogin() ?
          <div className={styles.sesion} onClick={() => setVisible(!visible)} >
            <p>Bienvenido, {user.name}!</p>
            <div
              className={`${styles.contentList} ${visible ? styles.show : null}`}
              onMouseLeave={() => setVisible(!visible)}
            >
              <Link to={'/'} onClick={handleCloseSession}>Cerrar sesion</Link>
            </div>
          </div>
          :
          <div className={styles.sesion} onClick={() => setVisible(!visible)} >
            <FontAwesomeIcon className={styles.icon} icon={faUser}></FontAwesomeIcon>
            <div
              className={`${styles.contentList} ${visible ? styles.show : null}`}
              onMouseLeave={() => setVisible(!visible)}
            >
              <Link to='/login'>Ingresar</Link>
              <Link to='/create'>Crear cuenta</Link>
            </div>
          </div>

      }
    </div>
  )
}