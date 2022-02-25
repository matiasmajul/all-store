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
import { NotFound } from './components/NotFound';

import './App.css';

const App = () => {
  return (
    <UserProvider>
      <CartProvider >
        <BrowserRouter basename={'/all-store'}>
          <NavBar />
          <Routes>
            <Route exact path="/cart" element={<Cart />}/>     
            <Route exact path='/create' element={ <CreateAccount />}/>           
            <Route exact path='/login' element={<Login />}/>
            <Route exact path="/item/:productId" element={<ItemDetailContainer />}/>
            <Route exact path="/category/:categoryId" element={<ItemListCategory/>}/>
            <Route exact path="/"  element={<ItemListContainer greeting="Bienvenidos a All Store" />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  )
}

export default App;