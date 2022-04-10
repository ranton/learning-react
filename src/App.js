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
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handleSearch}
      />
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

const InputWithLabel = (
  { id, label, value, type='text', onInputChange }
) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      &nbsp;
      <input id={id}
        type={type}
        value={value}
        onChange={onInputChange} />
    </>
  );
}


export default App;