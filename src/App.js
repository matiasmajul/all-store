import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NavBar } from './components/NavBar'
import { ItemListContainer } from './components/ItemListContainer';
import { ItemListCategory } from './components/ItemListCategory';
import { ItemDetailContainer } from './components/ItemDetailContainer';
import { CartProvider } from './components/CartContext';
import { UserProvider } from './components/UserContext';
import { Cart } from './components/Cart';
import { Login } from './components/Login';
import { CreateAccount } from './components/CreateAccount';

import './App.css';

const App = () => {
  return (
    <UserProvider>
      <CartProvider >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/cart" element={<Cart />}/>     
            <Route path='/create' element={ <CreateAccount />}/>           
            <Route path='/login' element={<Login />}/>
            <Route path="/item/:productId" element={<ItemDetailContainer />}/>
            <Route path="/:categoryId" element={<ItemListCategory/>}/>
            <Route path="/"  element={<ItemListContainer greeting="Bienvenidos a All Store" />}/>
            <Route path="*" element={<p>No encontrado</p>}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  )
}

export default App;