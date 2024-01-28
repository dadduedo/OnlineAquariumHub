"use client"
import { FC, useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";
import axios from 'axios';
import Shop from "../app/components/Shop";

import Home from "./Home";
import Confirmation from "../app/components/Checkout/Confirmation";

import Cart from "../app/components/Checkout/Cart";
import Checkout from "../app/components/Checkout/Checkout";

interface AppProps {}

const App: FC<AppProps> = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [openCart, setOpenCart] = useState(false);
	const [order, setOrder] = useState({});
	const [error, setError] = useState("");

  const toggleCart = () => {
    setOpenCart(true);
  };

  const toggleCloseCart = () => {
    setOpenCart(false);
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/apiMongo'); // Sostituisci 'backend/api/cart' con il tuo endpoint effettivo
      const cartData = response.data; // Estrai i dati dalla risposta Axios
      console.log("cartData")
      console.log(cartData)
      setCart(cartData);
    } catch (error) {
      // Gestione degli errori, ad esempio:
      console.error('Errore durante il recupero del carrello:', error);
    }
  };

  const handleAddToCart = async () => {
    // const { cart } = await handler.cart.add(productId, quantity, variant);
    // setCart(cart);
  };

  const handleCartQty = async () => {
    // const { cart } = await handler.cart.update(
    //   productId,
    //   { quantity },
    //   { variant }
    // );
    // setCart(cart);
  };

  const handleRemoveFromCart = async () => {
    // const { cart } = await handler.cart.remove(productId);
    // setCart(cart);
  };

  const refreshCart = async () => {
    // const newCart = await handler.cart.refresh();
    // setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId: string, newOrder: any) => {
    // try {
    //   const incomingOrder = await handler.checkout.capture(
    //     checkoutTokenId,
    //     newOrder
    //   );

    //   setOrder(incomingOrder);
    //   refreshCart();
    // } catch (error) {
    //   setError(error.data.error.message);
    // }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <main className="min-h-screen bg-gray-100">
      <Link href="/">
        <Home />
      </Link>
      <Link href="/shop">
        <Shop products={products} onAddToCart={handleAddToCart} />
      </Link>     
      <Link href="/checkout">
        <Checkout
          cart={cart}
          order={order}
          onCaptureCheckout={handleCaptureCheckout}
          error={error}
        />
      </Link>

      <Link href="/confirmation">
        <Confirmation />
      </Link>
        <Cart
          cart={cart}
          openCart={openCart}
          toggleCloseCart={toggleCloseCart}
          handleCartQty={handleCartQty}
          handleRemoveFromCart={handleRemoveFromCart}
        />
    </main>
  );
};

export default App;

