import React, { useState, useEffect } from 'react';

const list=[
    {
      title: 'React',
      url: 'https://react.dev/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0
    },
    {
      title: 'Redux',
      url: 'https://redux.dev/',
      author: 'Kevin Hart',
      num_comments: 2,
      points: 5,
      objectID: 1
    }
  ]

function App() {
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search />
      <hr />
      <List />
    </div>
  );
}

function List(){
  return(
    <li>{list.map(item=>(
      <ul key={item.objectID}>
        <span><a href={item.url}>{item.title}</a></span>
        <span> {item.author} </span>
        <span> {item.points} </span>
        <span> {item.num_comments} </span>
      </ul>
    ))}</li>
  );
}

function Search(){
  return(
    <div>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" />
    </div>
  );
}

export default App;