import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';

import styles from './styles/ItemDetail.module.css'
import { ItemCount } from './ItemCount'
import { cartContext } from './CartContext';


export const ItemDetail = (product) => {
    const { addItem } = useContext(cartContext)
    const [show, setShow] = useState(true);

    const handleAdd = (value) => {
        setShow(false)
        addItem(product, value)
    }

    return (
        <div className={styles.detail}>
            <div className={styles.description}>
                <h3 >{product.title}</h3>
                <p><span>${product.price}</span> </p>
                <p className={styles.descriptionText}>{product.description}</p>
                {
                    show ?
                        <ItemCount initial={1} stock={product.stock} onAdd={handleAdd} /> :
                        <Link to={`/cart`} className={styles.btnComprar}>
                            <span>Ir al carrito</span>
                        </Link>
                }
                <p>stock:{product.stock}</p>
            </div>
            <img src={product.image} alt={product.title} />
        </div>
    )
}

