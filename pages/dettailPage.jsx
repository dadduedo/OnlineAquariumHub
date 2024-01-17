import { useState } from 'react';
import axios from 'axios';
import {Navigation} from '../components/Navigation';
import SearchBar from '../components/Searchbar';
import MainList from '../components/MainList';
export default function Home() {
  const [response, setResponse] = useState(null);

  const handleRequest = async (method) => {
    try {
      const response = await axios[method]('/api/apiNegozio');
      setResponse(response.data);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <>
      <SearchBar />
      <Navigation />
      <MainList />
      <div>
        
        <button onClick={() => handleRequest('post')}>Create Document</button>
        <button onClick={() => handleRequest('get')}>Read Documents</button>
        <button onClick={() => handleRequest('put')}>Update Document</button>
        <button onClick={() => handleRequest('delete')}>Delete Document</button>

        {response && <p>{JSON.stringify(response)}</p>}
      </div>
    </>
  );
}
