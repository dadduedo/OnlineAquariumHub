"use client"
import { FC, useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";
import axios from 'axios';
import Shop from "./components/Shop";
import Navbar from "./components/Navbar";
import Home from "../pages/Home";
import Confirmation from "./components/Checkout/Confirmation";

import Cart from "../pages/cart";
import Checkout from "../pages/checkout";

interface AppProps {}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: {
    url: string;
  };
  selected_options: {
    color: string;
    size: string;
    option_name: string;
    group_name: string;
  }[];
}

interface Subtotal {
  formatted: string;
}

interface Cart {
  line_items: CartItem[];
  subtotal: Subtotal;
}



const App: FC<AppProps> = () => {
	//const [products, setProducts] = useState([]);
	const [cart, setCart] = useState<Cart>({ line_items: [], subtotal: { formatted: '' } });
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
      //REDIS
      // const response = await axios.get('/api/apiMongo'); // Sostituisci 'backend/api/cart' con il tuo endpoint effettivo
      // const cartData = response.data; // Estrai i dati dalla risposta Axios
      // console.log("cartData")
      // console.log(cartData)
      const cartData = {
        line_items: [
          { 
          id: 1, 
          name: 'Prodotto 1', 
          price: 20, 
          quantity: 2,
          image: { url: 'https://res.cloudinary.com/dakts9ect/image/upload/v1683835731/fcc-family-guys/stewie/stewie-family-guy-fox-1085482_qxxhmu.jpg' },
          selected_options: [{ color: 'blu', size: 'L', option_name: 'Colore', group_name: 'Opzioni' }]
          },
          { 
          id: 2, 
          name: 'Prodotto 2', 
          price: 30, 
          quantity: 1,
          image: { url: 'https://res.cloudinary.com/dakts9ect/image/upload/v1683835731/fcc-family-guys/stewie/stewie-family-guy-fox-1085482_qxxhmu.jpg' },
          selected_options: [{ color: 'blu', size: 'L', option_name: 'Colore', group_name: 'Opzioni' }]
          }],
		  subtotal: { formatted: '40.00' },
		}
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
  const staticCart = {
    total_items: 11,  // Puoi impostare il valore desiderato
  };
  console.log("cart")
  console.log(cart)
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar totalItems={staticCart.total_items} toggleCart={toggleCart} />

      <Link href="/">
        <Home />
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

