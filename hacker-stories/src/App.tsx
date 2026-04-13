import React, { useState, useEffect } from 'react';

type Story = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
}

const App=()=>{

  const stories : Story[] = [
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

  const [searchTerm, setSearchTerm]=useState('');

  const handleChange=(searchTerm:string)=>{
    setSearchTerm(searchTerm);
  }

  return(
    <div>
      <h1>My Hacker Stories</h1>
      <Search searchTerm={searchTerm} handleChange={handleChange} />
      <hr />
      <List list={stories.filter(story=>story.title.toLowerCase().includes(searchTerm.toLowerCase()))} />
    </div>
  );
}

type ListProps={
  list: Story[];
}

const List=({list}: ListProps)=>(
    <ul>{list.map(({objectID, ...item})=>(
      <Item  key={objectID} {...item} />
    ))}</ul>
  );

  type ItemProps={
    title: string;
    url:string;
    author: string;
    points: number;
    num_comments: number;
  }

  const Item=({title, url, author, points, num_comments}: ItemProps)=>{
    return(
      <li>
        <span><a href={url}>{title}</a></span>
        <span> {author} </span>
        <span> {points} </span>
        <span> {num_comments} </span>
      </li>
    );
  }

type SearchProps={
    searchTerm: string;
    handleChange:(searchTerm: string)=>void;
  }

const Search=({searchTerm, handleChange}:SearchProps)=>{
  
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" value={searchTerm} onChange={(event)=>handleChange(event.target.value)} />
      <p>Searching for <strong>{searchTerm}</strong></p>
    </div>
  );
}

export default App;