import React, {
  useState, useContext
} from 'react';
import { userContext } from './UserContext';


import styles from './styles/UserWidget.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const UserWidget = () => {
  const [visible, setVisible] = useState(false)
  const { isLogin,user,closeSession} = useContext(userContext);

  const handleCloseSession = ()=>{
    closeSession()
  }

  return (
    <div>
      {
        isLogin()?
        (
          <div className={styles.sesion} onClick={() => setVisible(!visible)} >
          <p>Bienvenido, {user.name}!</p>
          <ul className={`${styles.contentList} ${visible ? styles.show : null}`} onMouseLeave={() => setVisible(!visible)}>
              <li><Link to={'/'} onClick={handleCloseSession}>Cerrar sesion</Link></li>
            </ul>
          </div>):
         ( <div className={styles.sesion} onClick={() => setVisible(!visible)} >
            <FontAwesomeIcon className={styles.icon} icon={faUser}></FontAwesomeIcon>
            <ul className={`${styles.contentList} ${visible ? styles.show : null}`} onMouseLeave={() => setVisible(!visible)}>
              <li><Link to='/login'>Ingresar</Link></li>
              <li><Link to='/create'>Crear cuenta</Link></li>
            </ul>
          </div>)
          
      }
    </div>
  )
}