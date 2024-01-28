import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const Home = () => {
  const [listproducts, setlistProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      console.log("sto nella fetch");
      const response = await axios.get('/api/apiMongo');
      const responseData = response.data.data;
      console.log(responseData);
      setlistProducts(responseData);
    } catch (error) {
      console.error("Errore durante il recupero del carrello:", error);
    }
  };

  // Empty dependency array ensures useEffect runs only once on component mount
  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div className="container mx-auto flex">
      {/* Parte sinistra (filtri, ecc.) */}
      <aside className="w-1/4 p-4">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Filtri</h3>
          {/* Dimensioni dell'acquario */}
          <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-1">
            Dimensioni dell'acquario:
          </label>
          <select
            id="dimensions"
            name="dimensions"
            className="w-full p-2 border rounded-md"
            /* Add event handlers and options for dimensions */
          >
            {/* Options for dimensions */}
          </select>
        </div>

        <div>
          {/* Filtri per prezzo */}
          <h3 className="text-xl font-semibold mb-2">Filtro Prezzo</h3>
          <label htmlFor="minPrice" className="block text-sm text-gray-700 mb-1">
            Min:
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            className="w-full p-2 border rounded-md mb-2"
            /* Add event handlers for minPrice */
          />

          <label htmlFor="maxPrice" className="block text-sm text-gray-700 mb-1">
            Max:
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            className="w-full p-2 border rounded-md"
            /* Add event handlers for maxPrice */
          />
        </div>

        {/* Add more filter options as needed */}
      </aside>
      {/* Contenuto principale (lista prodotti) */}
      <main className="w-1/2 p-4">
        <div className="flex items-center justify-center mt-10">
          <h1 className="text-4xl font-bold mb-4">
            Benvenuti nel nostro negozio di acquari
          </h1>
        </div>

        {/* Ultimi Arrivi */}
        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Ultimi Arrivi</h2>
          <div className="flex flex-wrap justify-center">
            {listproducts.length > 0 ? (
              listproducts.map((product) => (
                <div key={product.id} className="m-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="rounded-md shadow-md"
                  />
                  <p className="text-lg font-semibold">{product.name}</p>
                  <p className="text-gray-600">{product.price}</p>
                </div>
              ))
            ) : (
              <p>Caricamento in corso...</p>
            )}
          </div>
        </section>

        {/* Prodotti in Vetrina */}
        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Prodotti in Vetrina</h2>
          <div className="flex flex-wrap justify-center">
            {listproducts.map((product) => (
              <div key={product.id} className="m-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="rounded-md shadow-md"
                />
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-gray-600">{product.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Parte destra (carrello) */}
      <aside className="w-1/4 p-4">
        {/* Aggiungi il contenuto del carrello qui */}
        <p>Contenuto del carrello</p>
      </aside>
    </div>
  );
};

export default Home;

