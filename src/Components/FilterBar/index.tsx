import React from 'react';
import './index.css';


const FilterComponent: React.FC = () => {
  return (
    <div className="filter-component">
      <div className="filter-header">
        <h2>Filter</h2>
        <button className="clear-all">Clear All</button>
      </div>
      <div className="filter-section">
        <h3>Location</h3>
        <div className="filter-option">
          <label>
            <input type="checkbox" defaultChecked />
            <img src="path_to_france_flag.jpg" alt="France" />
            France (1k+)
          </label>
        </div>
        <div className="filter-option">
          <label>
            <input type="checkbox" defaultChecked />
            <img src="path_to_japan_flag.jpg" alt="Japan" />
            Japan (10)
          </label>
        </div>
        <div className="filter-option">
          <label>
            <input type="checkbox" />
            <img src="path_to_usa_flag.jpg" alt="United States" />
            United States (1k+)
          </label>
        </div>
        <div className="filter-option">
          <label>
            <input type="checkbox" />
            <img src="path_to_chile_flag.jpg" alt="Chile" />
            Chile (100)
          </label>
        </div>
        <div className="filter-option">
          <label>
            <input type="checkbox" />
            <img src="path_to_venezuela_flag.jpg" alt="Venezuela" />
            Venezuela (100)
          </label>
        </div>
      </div>
      <button className="find-button">Find KOLs near me</button>
      <div className="filter-section">
        <h3>Languages</h3>
        <div className="filter-option">
          <label>
            <input type="checkbox" defaultChecked />
            <img src="path_to_vietnamese_flag.jpg" alt="Vietnamese" />
            Vietnamese (10)
          </label>
        </div>
        <div className="filter-option">
          <label>
            <input type="checkbox" defaultChecked />
            <img src="path_to_japanese_flag.jpg" alt="Japanese" />
            Japanese (10)
          </label>
        </div>
        <div className="filter-option">
          <label>
            <input type="checkbox" />
            <img src="path_to_chinese_flag.jpg" alt="Chinese" />
            Chinese (100)
          </label>
        </div>
        <div className="filter-option">
          <label>
            <input type="checkbox" />
            <img src="path_to_english_flag.jpg" alt="English" />
            English (1k+)
          </label>
        </div>
      </div>
      <div className="filter-section">
        <h3>Niche</h3>
        <div className="filter-option">
          <label>
            <input type="checkbox" defaultChecked />
            Food (100)
          </label>
        </div>
        <div className="filter-option">
          <label>
            <input type="checkbox" />
            Fashion (100)
          </label>
        </div>
        <div className="filter-option">
          <label>
            <input type="checkbox" />
            Travel (100)
          </label>
        </div>
        <div className="filter-option">
          <label>
            <input type="checkbox" />
            Beauty (100)
          </label>
        </div>
        <div className="filter-option">
          <label>
            <input type="checkbox" defaultChecked />
            Technology (10)
          </label>
        </div>
        <div className="filter-option">
          <label>
            <input type="checkbox" />
            Fitness (100)
          </label>
        </div>
        <div className="filter-option">
          <label>
            <input type="checkbox" />
            Entertainment (100)
          </label>
        </div>
      </div>
      <div className="filter-section">
        <h3>Followers</h3>
        <div className="slider-option">
          <label>5000</label>
          <input type="range" min="0" max="10000" defaultValue="5000" />
          <label>10000</label>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
