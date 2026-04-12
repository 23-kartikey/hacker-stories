import React, { useState, useEffect } from 'react';

const App=()=>{

  const stories=[
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
  return(
    <div>
      <h1>My Hacker Stories</h1>
      <Search />
      <hr />
      <List list={stories} />
    </div>
  );
}


const List=({list})=>(
    <li>{list.map(item=>(
      <ul key={item.objectID}>
        <span><a href={item.url}>{item.title}</a></span>
        <span> {item.author} </span>
        <span> {item.points} </span>
        <span> {item.num_comments} </span>
      </ul>
    ))}</li>
  );

const Search=()=>{
  
  const handleChange=(event)=>{
    console.log(event);
    console.log(event.target.value)
  }
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" onChange={handleChange} />
    </div>
  );
}

export default App;