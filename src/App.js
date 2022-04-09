import * as React from 'react';

const useSemiPersistentState = (key, intialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || intialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  // const [searchTerm, setSearchTerm] = React.useState(
  //   localStorage.getItem('search') ?? 'React'
  // );

  // React.useEffect(() => {
  //   localStorage.setItem('search', searchTerm)
  // }, [searchTerm])

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchedStories} />
    </div>
  );
}

const List = ({ list }) => {

  console.log('List renders');

  return (
    <ul>      
      {list.map(({ objectID, ...item }) => (
        <Item key={objectID} {...item} />
      ))}
    </ul>
  );
}

const Item = ({ title, url, author, num_comments, points }) => {

  console.log('Item renders');

  return (
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{num_comments}</span>
      <span>{author}</span>
      <span>{points}</span>
    </li>
  );
}

const Search = ({ search, onSearch }) => {

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search"
        type="text"
        value={search}
        onChange={onSearch} />
    </div>
  );
}


export default App;