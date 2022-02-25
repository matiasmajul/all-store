import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Router basename="/tech-store">
          <NavBar />
          <Switch>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path='/create'>
              <CreateAccount />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path="/item/:productId" >
              <ItemDetailContainer />
            </Route>
            <Route path="/:categoryId">
              <ItemListCategory />
            </Route>
            <Route exact path="/" >
              <ItemListContainer greeting="Bienvenidos a All Store" />
            </Route>
            <Route path="*" >
              <p>No encontrado</p>
            </Route>
          </Switch>
        </Router>
      </CartProvider>
    </UserProvider>
  )
}

export default App;