import React from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.scss';

const Dropdown = ({ onMouseOut, onMouseOver, isHovering }) => {
  return (
    <div
      className={isHovering ? 'Dropdown' : 'Dropdown hide'}
      onMouseOut={onMouseOut}
    >
      <ul className="main-cat" onMouseOver={onMouseOver}>
        <li>
          <Link to="/product_list/main/main_category_id=1">
            <div className="main-cat-name">ZINWOOS ITEMS</div>
          </Link>
          <div className="sub-cat">
            <ul>
              <Link to="/product_list/sub/sub_category_id=1">
                <li>CLOTHING & ACCESSORIES</li>
              </Link>
              <Link to="/product_list/sub/sub_category_id=2">
                <li>DIGITALS</li>
              </Link>
              <Link to="/product_list/sub/sub_category_id=3">
                <li>BOOKS</li>
              </Link>
            </ul>
          </div>
        </li>
        <li>
          <Link to="/product_list/main/main_category_id=2">
            <div className="main-cat-name">ZINWOOS GOODS</div>
          </Link>
          <div className="sub-cat">
            <ul>
              <Link to="/product_list/sub/sub_category_id=4">
                <li>STICKERS</li>
              </Link>

              <Link to="/product_list/sub/sub_category_id=5">
                <li>PHOTO CARD</li>
              </Link>
              <Link to="/product_list/sub/sub_category_id=6">
                <li>PRINTED T-SHIRTS</li>
              </Link>
            </ul>
          </div>
        </li>
        <li>
          <Link to="/product_list/main/main_category_id=3">
            <div className="main-cat-name border-none">ZINWOOS TIME</div>
          </Link>
          <div className="sub-cat third-sub-cat">
            <ul>
              <Link to="/product_list/sub/sub_category_id=7">
                <li>TIME</li>
              </Link>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
