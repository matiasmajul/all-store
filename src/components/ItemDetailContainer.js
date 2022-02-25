import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { ItemDetail } from "./ItemDetail"
import { Link } from "react-router-dom";
// FIRESTORE IMPORT
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase'
import styles from './styles/ItemDetailContainer.module.css'

export const ItemDetailContainer = () => {
    const { productId } = useParams()
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { docs } = await getDocs(collection(db, "items"));
                docs.map((doc) =>
                    doc.id === productId ?
                        setProduct({
                            id: doc.id,
                            ...doc.data()
                        })
                        : ''
                )
            }
            catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        getProducts()
    }, [productId])


    return (
        <div>
            {isLoading ? (
                <div className="preloader"></div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : Object.keys(product).length !== 0 ? (
                <ItemDetail {...product} />
            ) : (
                <div className={styles.empty}>
                    <p>
                        No existe el producto
                    </p>
                    <Link to={'/'} className={styles.back}>Regresar al menu principal</Link>
                </div>
            )

            }
        </div>
    )
}