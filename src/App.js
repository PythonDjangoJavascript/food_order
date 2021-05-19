import React, { useState } from 'react';

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals"
import Cart from "./components/Cart/Cart"
import CartProvider from "./store/CartProvider"

function App() {

  // UseState fro Cart
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }
  const hideChartHandler = () => {
    setCartIsShown(false);
  }

  // I am wrapping app with CartProvider as I need to access this context 
  // to all of its children
  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={hideChartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
