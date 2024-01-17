import { Container } from '../components/Container';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { useClient } from 'next/data-client';

useClient();
const MainPage = () => {
  // Utilizza lo stato di React per memorizzare i dati ottenuti dalla chiamata API
  const [data, setData] = useState({
    names: [],
    links: [],
    descriptions: [],
    images: [],
    prices: [],
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/apiNegozio');
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        // Aggiorna lo stato con i dati ottenuti dalla chiamata API
        setData({
          names: response.data.data.map((item) => item.name),
          links: response.data.data.map((item) => item.link),
          descriptions: response.data.data.map((item) => item.description),
          images: response.data.data.map((item) => item.image),
          prices: response.data.data.map((item) => item.price),
        });
      } else {
        console.log('Array vuoto o undefined');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Chiamata API direttamente all'interno del componente usando useEffect
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <Container className="grid grid-cols-2 gap-1 py-5 md:grid-cols-3 lg:grid-cols-4">
        {data.names.map((item, index) => (
          <Link
            href={`/characters/${data.prices[index]}`}
            key={item}
            className="overflow-hidden rounded-md"
          >
            <Image
              src={data.images[index]}
              alt=""
              className="transition-all duration-500 hover:scale-110 hover:-rotate-2"
              width={500}
              height={500}
            />
          </Link>
        ))}
      </Container>
    </main>
  );
};

export default MainPage;
