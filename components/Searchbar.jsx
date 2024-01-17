import React, { useState } from 'react';
import styled from 'styled-components';
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const SearchInput = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
`;

return (
  <div>
    <SearchInput
      type="text"
      placeholder="Cerca..."
      value={searchTerm}
      onChange={handleInputChange}
    />
    <SearchButton onClick={() => console.log(`Ricerca: ${searchTerm}`)}>
      Cerca
    </SearchButton>
  </div>
);
}
export default SearchBar;