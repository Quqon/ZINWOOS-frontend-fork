import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PriceCalculator from './components/PriceCalculator';
import ProductImg from './components/ProductImg';
import ProductDetailTab from '../ProductDetailTab/ProductDetailTab';
import SubNav from '../../components/SubNav/SubNav';
import './ProductDetail.scss';

const ProductDetail = () => {
  const params = useParams();
  const productId = params.itemId;
  const [product, setProduct] = useState({});
  const {
    name,
    description,
    price,
    detail_image,
    main_category_name,
    sub_category_name,
    max_amount,
  } = product;

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/items/${productId}`)
      .then(response => response.json())
      .then(result => {
        setProduct(result.data[0]);
      });
  }, [productId]);

  return (
    <div className="ProductDetail">
      <div className="product-wrap">
        <SubNav
          main_category_name={main_category_name}
          sub_category_name={sub_category_name}
        />
        <div className="product">
          <article className="product-item">
            {detail_image && <ProductImg img={`http://127.0.0.1:3000${detail_image}`} alt={name} />}
            <div className="product-item-contents">
              <h1 className="product-item-contents-title">{name}</h1>
              <p className="product-item-contents-info">{description}</p>
              <ul className="product-item-contents-ship">
                <li>택배배송</li>
                <li>
                  <span>3,000원</span>
                  <span>(주문시 결제)</span>
                </li>
                <li>100,000원 이상 구매시 무료 / 제주,도서지역 추가 3,000원</li>
              </ul>
              <PriceCalculator
                name={name}
                price={price}
                productId={productId}
                max_amount={max_amount}
                detail_image={detail_image}
              />
            </div>
          </article>
        </div>
        <ProductDetailTab product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;