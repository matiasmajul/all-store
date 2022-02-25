import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { cartContext } from './CartContext';
import { userContext } from './UserContext';

import styles from './styles/Cart.module.css'
import Swal from 'sweetalert2'

import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const Cart = () => {
    const { products, removeItem, getCostoTotal, clearProducts } = useContext(cartContext);
    const { user, isLogin } = useContext(userContext);

    const handleFinish = () => {
        const productFilter = []

        for (let product of products) {
            productFilter.push({ id: product.id, title: product.title, price: product.price, stock: product.stock })
        }
        const order = {
            buyer: {
                name: user.name,
                phone: user.phone,
                email: user.email
            },
            items: productFilter,
            date: Timestamp.fromDate(new Date()),
            total: getCostoTotal() * 1.21 + 500,
            state: 'generada'
        }

        // CREATE
        const createProduct = async () => {
            const createdProduct = await addDoc(collection(db, 'orders'), order);

            Swal.fire({
                icon: 'success',
                title: 'Compra realizada',
                text: `N° Orden: ${createdProduct.id}`,
            })
            clearProducts()
        };
        createProduct();
    }

    
    return (
        <section>
            <h1 className={styles.title}>Carrito de compras</h1>
            <div className={styles.content}>
                <div className={styles.products}>
                    {
                        products.length !== 0 ? products.map(product => (

                            <div key={product.id} className={styles.order}>
                                <div className={styles.image}>
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className={styles.detail}>
                                    <span>{product.title}</span>
                                    <span>${product.price}</span>
                                    <span>{product.category}</span>
                                    <p>En stock</p>
                                </div>
                                <div className={styles.lot}>
                                    <span>cantidad: {product.stock} {product.stock > 1 ? 'unidades' : 'unidad'}</span>
                                </div>
                                <div className={styles.delete}>
                                    <span onClick={() => {
                                        removeItem(product.id)
                                    }} >X</span>
                                </div>
                            </div>))

                            :
                            <div className={styles.empty}>
                                <p>
                                    No hay productos agregados
                                </p>
                                <Link to={'/'} className={styles.back}>Regresar al menu principal</Link>
                            </div>
                    }
                </div>
                <div className={styles.summary}>
                    <h4>Pedido</h4>
                    <ul>
                        <li>Subtotal <span>${(getCostoTotal())}</span> </li>
                        <li>Envio <span>$ {getCostoTotal() !== 0 ? 500 : 0}</span> </li>
                        <li>Impuesto <span>${Math.round(getCostoTotal() * 0.21)}</span> </li>
                        <li>Total <span>${Math.round(getCostoTotal() * 1.21) + (getCostoTotal() !== 0 ? 5.00 : 0)}</span> </li>
                    </ul>
                    {
                        !isLogin() ?
                            <div className={styles.session}>
                                <Link to={'/login'} >Iniciar sesion</Link>
                                <Link to={'/create'}>Crear cuenta</Link>
                            </div>
                            :
                            products.length !== 0 ?
                                <button onClick={handleFinish}>Comprar</button>
                                : ''
                    }
                </div>
            </div>
        </section>)
}