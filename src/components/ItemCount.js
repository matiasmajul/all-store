import React, { useState } from 'react';
import styles from './styles/ItemCount.module.css'

export const ItemCount = ({ stock, initial, onAdd }) => {
    const [cant, setCant] = useState(initial);

    const handlePop = () => {
        if (cant > 1)
            setCant(cant - 1)
    }

    const handlePush = () => {
        if (cant < stock)
            setCant(cant + 1)    
    }

    return (
        <div className={styles.content} >
            <div className={styles.input}>
                <span>{cant}</span>
                <div  className={styles.inputBtn}>
                    <span onClick={handlePush}>+</span>
                    <span onClick={handlePop}>-</span>
                </div>
            </div>
            <button onClick={() => onAdd(cant)}>Agregar al carrito</button>
        </div>
    )
}