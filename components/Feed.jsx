'use client';

import { useState, useEffect, useContext } from 'react';
import PromptCard from './PromptCard';
import { useSearch } from '../context/SearchContext';

const PromptCardList = ({ data, handleTagClick }) => {
  console.log(data);
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { searchText, setSearchText } = useSearch();
  const { filteredPrompts, setFilteredPrompts } = useSearch();
  const { posts, setPosts } = useSearch();

  const handleSearchChange = (e) => {
    const searchChangeText = e.target.value;
    setSearchText(searchChangeText);

    const someFilteredPosts = posts.filter((post) => {
      const { tag, prompt, creator } = post;
      const lowerSearchText = searchText.toLowerCase();

      const tagMatch = tag.toLowerCase().includes(lowerSearchText);

      const contentMatch = prompt.toLowerCase().includes(lowerSearchText);

      const creatorMatch = creator.username
        .toLowerCase()
        .includes(lowerSearchText);
      return tagMatch || contentMatch || creatorMatch;
    });
    console.log(someFilteredPosts);
    setFilteredPrompts(someFilteredPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setFilteredPrompts(data);
      setSearchText('');
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Поиск по тэгу или пользователю"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={filteredPrompts}
        handleTagClick={(tag) => setSearchText(tag)}
      />
    </section>
  );
};

export default Feed;
