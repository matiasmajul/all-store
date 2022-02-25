import React, { useState, useEffect } from "react";
import { ItemList } from "./ItemList"

import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase'

import './styles/ItemListContainer.module.css';

export const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const { docs } = await getDocs(collection(db, "items"));
            const products = docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })
            setProducts(products)
        }
        getProducts()
    }, [])

    return (
        <div>
            <h1>{greeting}</h1>
            <ItemList products={products} />
        </div>

    )
}
