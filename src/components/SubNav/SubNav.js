import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SubNav.scss';

const SubNav = ({ main_category_name, sub_category_name }) => {
  const [navOpen, setNavOpen] = useState(true);

  return (
    <nav className="SubNav">
      <span>Home /</span>
      <div
        onMouseEnter={() => setNavOpen(!navOpen)}
        onMouseLeave={() => setNavOpen(!navOpen)}
        className={!navOpen ? 'nav-link active' : 'nav-link'}
      >
        <div className="fixed-link">{main_category_name}</div>
        <form className="active-links">
          <Link to="/product_list/main/main_category_id=1">
            <div className="active-link">ZINWOOS Item</div>
          </Link>
          <Link to="/product_list/main/main_category_id=2">
            <div className="active-link">ZINWOOS Goods</div>
          </Link>
          <Link to="/product_list/main/main_category_id=3">
            <div className="active-link">ZINWOOS Time</div>
          </Link>
        </form>
      </div>
      <span>/ {sub_category_name}</span>
    </nav>
  );
};

export default SubNav;
