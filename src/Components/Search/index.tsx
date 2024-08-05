import React from 'react';
import './index.css';
const SearchBar: React.FC = () => {
    return (
      <div className="search-bar">
        <div className="icon-container">
          <img src="path_to_icon1.jpg" alt="Icon 1" className="icon" />
          <img src="path_to_icon2.jpg" alt="Icon 2" className="icon" />
        </div>
        <input type="text" placeholder="Find the perfect KOLs for your campaign..." className="search-input" />
      </div>
    );
  };
  
  export default SearchBar;