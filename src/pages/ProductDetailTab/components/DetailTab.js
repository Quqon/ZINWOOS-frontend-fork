import React from 'react';
import './DetailTab.scss';

const DetailTab = ({ product }) => {
  return (
    <section className="DetailTab">
      <div className="detail-main-wrap">
        <div className="detail-main-img-wrap">
          <img
            className="detail-main-img"
            src={`https://port-0-zinwoos-backend-fork-m1kb43jnab9bc7ab.sel4.cloudtype.app${product.detail_image}`}
            alt="메인 상세 사진"
          />
          <div className="detail-main-contents">
            <h1 className="detail-product-name">{product.name}</h1>
            <p className="detail-product-txt">{product.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailTab;
