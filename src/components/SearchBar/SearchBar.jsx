import './SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleSearch = () => {
    onSearch();
  };

  return (
    <div className="search_bar">
      <input
        type="text"
        className="searchInput"
        placeholder="Search task..."
        value={searchQuery || ''}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button className="serachBtn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
