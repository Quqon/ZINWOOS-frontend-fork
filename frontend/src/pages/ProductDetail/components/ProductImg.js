import React from 'react';
import { useState } from 'react';
import './ProductImg.scss';

const ProductImg = ({ img, alt }) => {
  const [mainImg, setMainImg] = useState(img);

  return (
    <div className="ProductImg">
      <div className="product-img-container">
        <img className="product-img" alt={alt} src={mainImg} />
      </div>
      <div className="product-sub-img-container">
        
      </div>
    </div>
  );
};

export default ProductImg;
