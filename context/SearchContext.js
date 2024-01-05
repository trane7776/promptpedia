'use client';
import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [posts, setPosts] = useState([]);
  return (
    <SearchContext.Provider
      value={{
        searchText,
        setSearchText,
        filteredPrompts,
        setFilteredPrompts,
        posts,
        setPosts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
