import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Recipe from'./Recipe.js';
import './App.css';


const App = () => {

  const APP_ID = "3465ffad";
  const APP_KEY = "ccaa7ac30d9e4a5fe29847350d28592c";

  const[recipes, setRecipes] = useState([]);
  const[search, setSearch] = useState("");
  const[query, setQuery] = useState('chicken')

  useEffect(() =>{
    getRecipes();
  }, [query]);

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search)
  }

  const getSearch = e => {
    // Stop page refresh
    e.preventDefault();
    setQuery(search);
  }
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
  );



};

export default App;
