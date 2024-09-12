import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductList.scss';
import MainImage from './component/MainImage/MainImage';
import ProductImage from './component/Product/ProductImage';

const ProductList = () => {
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState(true);
  const [sort, setSort] = useState('name');
  const params = useParams();
  const mainId = params;

  useEffect(() => {
      fetch(
        `http://127.0.0.1:3000/items/${mainId.id}?${mainId.id2}&sort=${sort}&order=${order ? 'ASC' : 'DESC'}&limit=100&offset=0`
      )
      
      .then(res => res.json())
      .then(data => {
        console.log(data, 'data')
        setProduct(data.data);
      });
  }, [mainId, order, sort]);

  const nameSortHandler = () => {
    setSort('name');
    setOrder(!order);
  };

  const priceSortHandler = () => {
    setSort('price');
    setOrder(!order);
  };

  const likesSortHandler = () => {
    setSort('likeCount');
    setOrder(!order);
  };

  if (product === null) return <>loading...</>;

  const isData = Array.isArray(product) && product.length > 0;

  if (!isData) return <>No products available</>;

  return (
    <div className="ProductList">
      <MainImage
        mainTitle={product[0].main_category_name}
        mainText={product[0].main__category_description}
      />
      <div id="tag" />
      <div className="contents">
        <div className="contents-wrapper">
          <div className="move-solt">
            <div className="product-move" />
            <div className="product-sort">
              <div className="sort">
                <button className="sort-btn" onClick={nameSortHandler}>
                  이름순
                </button>
                &nbsp;&nbsp;
                <button className="sort-btn" onClick={priceSortHandler}>
                  가격순
                </button>
                &nbsp;&nbsp;
                <button className="sort-btn" onClick={likesSortHandler}>
                  인기순
                </button>
              </div>
            </div>
          </div>
          <div className="product-content">
            <div className="product-list">
              {product.map(e => {
                return (
                  <ProductImage
                    product={e}
                    key={`${e.items_id}-${e.item_id}`}
                  />
                );
              })}
            </div>
          </div>
          <div className="move-btn-wrapper">
            <div className="move-btn">
              <div className="Button" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
