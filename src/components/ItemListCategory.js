import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'

import { ItemList } from "./ItemList"

import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from '../firebase/firebase'

import './styles/ItemListCategory.css'

export const ItemListCategory = () => {
    const { categoryId } = useParams()
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const { docs } = await getDocs(query(collection(db, "items"), where("category", "==", `${categoryId}`)))
            const products = docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })
            setProducts(products)
        }
        getProducts()
    }, [categoryId])


    return (
        <div className="content">
            <ItemList products={products} />
        </div>
    )
}
