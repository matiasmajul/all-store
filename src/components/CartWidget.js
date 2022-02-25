import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles/CartWidget.module.css";
import { cartContext } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export const CartWidget = () => {
    const { products, getTotalProducts, removeItem } = useContext(cartContext)
    const [visible, setVisible] = useState(false)

    return (
        <div className={styles.cart} >
            {/* ICONO */}
            <FontAwesomeIcon className={styles.icon} icon={faCartShopping} onClick={() => setVisible(!visible)}/>
            {/* TOTAL DE PRODUCTOS */}
            <span className={`${styles.cartTotal} ${products.length ? null : styles.show}`} >
                {getTotalProducts()}
            </span>

            {/* LISTA DE PRODUCTOS */}
                <ul className={` ${styles.list} ${!visible ? styles.show : null}`}
                    onMouseLeave={() => setVisible(!visible)}>

                    {/* MAPEO DE PRODUCTOS */}
                    {products.map(prod => (
                        <li key={prod.id} className={styles.listProduct}>
                            <div >
                                <img src={prod.image} alt={prod.title} />
                            </div>
                            <div>
                                <span>{prod.title}</span>
                                <p>White and Black</p>
                            </div>
                            <span className={styles.delete} onClick={() => removeItem(prod.id)}>X</span>
                        </li>

                    ))
                    }
                    <Link className={styles.btnCart}
                        to={'/cart'}
                        onClick={() => setVisible(!visible)}>
                        Terminar mi compra
                    </Link>
                </ul> 
        </div>
    )

}