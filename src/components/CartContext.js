import React, { createContext, useState, useEffect } from "react";

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        let count=0
        let arrayProduct=[]
        while(count!==-1)
        {
             let id = localStorage.key(`${count}`)
             let product =JSON.parse(localStorage.getItem(id))
             if(id!==null)
             arrayProduct.push(product)
             else break
             count++
             
         }
         setProducts(arrayProduct)
     },[])
   
    const addItem = (product, quantity) => {
        //agregar cierta cantidad de un item al carrito
        if (!isInCart(product)) 
         {
            setProducts([...products, { ...product, stock: quantity }].sort((a, b) => {
                if (a.category < b.category) return 1;
                if (a.category > b.category) return -1;
                return 0;
            }))
            let localProduct = {...product,stock: quantity}
            localStorage.setItem(product.id, JSON.stringify(localProduct))
        }
    }

    const removeItem = (id) => {
        //Remover un item del cart por usando su id
        setProducts(products.filter(product=>product.id!==id))  
        localStorage.removeItem(id)

    }

    const clearProducts = () => {
        //Remover todos los items
        setProducts([])
        localStorage.clear()

    }

    const isInCart = (item) => {
        if (products.find(x => x.id === item.id) === undefined)
            return false
        else
            return true
    }

    const getTotalProducts = () => {
        let total = 0
        for (let product of products) {
            total += product.stock
        }
        return total

    }
    const getCostoTotal = () => {
        let total = 0
        for (let product of products) {
            //total += product.cant * product.price
            total +=  product.price*product.stock
        }

        return total
    }

    return <cartContext.Provider value={{ products, getCostoTotal, isInCart, clearProducts, removeItem, addItem, getTotalProducts }}>
        {children}
    </cartContext.Provider>


}