import React from 'react';
import { Link } from 'react-router-dom'

import styles from "./styles/NavBar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAtlassian} from '@fortawesome/free-brands-svg-icons'

import { CartWidget } from "./CartWidget";
import { UserWidget } from './UserWidget';
import { CategoryWidget } from './CategoryWidget';

export const NavBar = () => {
 
    return (
        <nav className={styles.navBar}>
            <Link to={`/`} className={styles.icon}>
                <FontAwesomeIcon   icon={faAtlassian} />
            </Link>
            <CategoryWidget />
            <UserWidget />
            <CartWidget />
        </nav>
    )
}