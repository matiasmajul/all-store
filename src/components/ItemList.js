import React from 'react'
import { Item } from './Item'

import styles from './styles/ItemList.module.css'

export const ItemList = ({ products }) => {
    return (
        <div className={styles.list}>
            {products.length === 0 ? (
                <div className="preloader"></div>
            ) : (
                products.map((product) => (
                    <Item key={product.id} {...product} />
                ))
            )}
        </div>
    )
}
