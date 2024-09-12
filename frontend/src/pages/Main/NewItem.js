import React from 'react';
import { Link } from 'react-router-dom';
import './NewItem.scss';

const NewItem = ({ itemData }) => {
  return (
    <section className="NewItem">
      <h1 className="New-sub-title">ZINWOOS New Product</h1>
      <h2 className="New-sub-content">진우스가 추천하는 새로운 상품!</h2>

      <div className="New-product-wrap">
        {itemData.map(item => {
          return (
            <Link to={`./product_detail/${item.id}`}> 
              <div key={item.id} className="New-product">
                <div className="New-product-image">
                  <img
                    className="product-image"
                    src={`http://127.0.0.1:3000${item.detail_image}`}
                    alt={item.description}
                  />
                </div>
                <h2 className="New-product-title">{item.name}</h2>
                <p className="New-product-content">{item.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default NewItem;
