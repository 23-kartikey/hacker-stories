import React, { useState, useEffect } from 'react';

type Story = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
}

const useStorageItem=(key: string, initialState: string)=>{
  const [value, setValue]=useState(localStorage.getItem(key)||initialState);
  
  useEffect(()=>{
    localStorage.setItem(key, value);
  },[key, value]);

  return [value, setValue] as const;
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

  const [searchTerm, setSearchTerm]=useStorageItem('search', 'React');

  const handleSearch=(event: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchTerm(event.target.value);
  }

  return(
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel id="search" value={searchTerm} type="text" handleInput={handleSearch}><strong>Search: </strong></InputWithLabel>
      <p>Searching for: {searchTerm}</p>
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

type InputWithLabelProps={
    id:string,
    value: string,
    type?: string,
    handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
    children: React.ReactNode;
  }

const InputWithLabel=({ id, value, type="text", handleInput, children}: InputWithLabelProps)=>{
  
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input type={type} id={id} value={value} onChange={handleInput} />
    </>
  );
}

export default App;