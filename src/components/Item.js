import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/Item.module.css'

export const Item = ({ id, title, image, price }) => {
    return (
        <Link className={styles.item} to={`/item/${id}`}>
            <span className={styles.descuento}>
                %{Math.round(Math.random() * 4 + 1) * 10} off
            </span>
            <img src={image} alt={title} />
            <span className={styles.title}>
                {title}
            </span>
            <p>
                ${price}
            </p>
        </Link>
    )
}

