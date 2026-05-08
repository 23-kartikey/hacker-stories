import React, { useState, useEffect, useRef } from 'react';

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

  const [stories, setStories] =useState([
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
  ]);

  const [searchTerm, setSearchTerm]=useStorageItem('search', 'React');

  const handleSearch=(event: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchTerm(event.target.value);
  }

  const removeItem=(objectID: number)=>{
    setStories(prev=>prev.filter(story=>story.objectID!==objectID));
  }


  return(
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel isFocused id="search" value={searchTerm} type="text" handleInput={handleSearch}><strong>Search: </strong></InputWithLabel>
      <p>Searching for: {searchTerm}</p>
      <hr />
      <List list={stories.filter(story=>story.title.toLowerCase().includes(searchTerm.toLowerCase()))}  removeItem={removeItem} />

    </div>
  );
}

type ListProps={
  list: Story[];
  removeItem: ((id: number)=>void);
}

const List=({list, removeItem}: ListProps)=>(
    <ul>{list.map((item)=>(
      <Item  key={item.objectID} {...item} removeItem={removeItem} />
    ))}</ul>
  );

  type ItemProps={
    title: string;
    url:string;
    author: string;
    points: number;
    num_comments: number;
    objectID: number;
    removeItem: ((id: number)=>void)
  }

  const Item=({title, url, author, points, num_comments, objectID, removeItem}: ItemProps)=>{
    return(
      <li>
        <span><a href={url}>{title}</a></span>
        <span> {author} </span>
        <span> {points} </span>
        <span> {num_comments} </span>
        <button onClick={()=>removeItem(objectID)} type="button">Remove</button>
      </li>
    );
  }

type InputWithLabelProps={
    isFocused: boolean,
    id:string,
    value: string,
    type?: string,
    handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
    children: React.ReactNode;
  }

const InputWithLabel=({ isFocused, id, value, type="text", handleInput, children}: InputWithLabelProps)=>{
  let name="";
  
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input autoFocus={isFocused} type={type} id={id} value={value} onChange={handleInput} />
    </>
  );
}

export default App;