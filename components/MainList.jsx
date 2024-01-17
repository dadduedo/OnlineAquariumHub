import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Container } from './Container'
import Image from 'next/image'

const ItemList = () => {
  const [items, setItems] = useState({
    name: [],
    link: [],
    description: [],
    image: [],
    price: [],
  });

  // Funzione per il recupero dei dati
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/apiNegozio');
  
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        // Estrai i dati specifici da ogni oggetto e crea nuovi array
        const names = response.data.data.map(item => item.name);
        const links = response.data.data.map(item => item.link);
        const descriptions = response.data.data.map(item => item.description);
        const images = response.data.data.map(item => item.image);
        const prices = response.data.data.map(item => item.price);
  
        // Aggiorna lo stato utilizzando i nuovi array
        setItems({
          name: names,
          link: links,
          description: descriptions,
          image: images,
          price: prices,
        });
      } else {
        console.log("Array vuoto o undefined");
        // Gestisci il caso in cui l'array è vuoto o undefined, se necessario
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Chiamare la funzione di recupero dati all'inizio
  useEffect(() => {
    fetchData();
  }, []);

  return (
  <Container className="flex flex-col gap-5 py-5" as="main">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold capitalize">{items.name}</h1>
        <ul className="flex gap-1 text-sm">
          {items.name.map(item => {
            return (
              <li
                key={item}
                className="p-2 text-gray-300 bg-gray-800 rounded-md"
              >
                {item}
              </li>
            )
          })}
        </ul>
      </div>
      <p className="text-sm leading-6">{items.description}</p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.image.map(image => {
          return (
            <li
              key={image}
              className="relative flex overflow-hidden bg-gray-900 rounded-xl"
            >
            <Image
              className="transition-all duration-500 hover:scale-110 hover:rotate-2"
              src={image}
              alt=""
              width={760}
              height={435}
            />
            </li>
          )
        })}
      </ul>
      {items.description && (
        <>
          <h2 className="text-xl font-bold">Price</h2>
          <ul className="flex flex-wrap gap-1">
            {items.price.map(item => {
              return (
                <li
                  className="flex justify-center flex-grow px-2 py-1 text-orange-400 rounded-full bg-orange-950"
                  key={item}
                >
                  {item}
                </li>
              )
            })}
          </ul>
        </>
      )}
  </Container>
  );
};

export default ItemList;

