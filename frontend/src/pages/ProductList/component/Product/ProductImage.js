import React from 'react';
import { Link } from 'react-router-dom';
import './ProductImage.scss';

const ProductImage = ({ product }) => {
  const { description, detail_image, name, price, tags_name, id } =
    product;

  const value = parseInt(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div className="ProductImage">
      <div className="thumb">
        <Link key={name} to={`/product_detail/${id}`}>
          <img src={`http://127.0.0.1:3000${detail_image}`} alt={name} className="model" />
        </Link>
      </div>
      <div className="product-name">{name}</div>
      <div className="shirts-info"> {description}</div>
      <div className="price">{value}원</div>
      <div>
        <div className="option">{tags_name}</div>
      </div>
    </div>
  );
};

export default ProductImage;
