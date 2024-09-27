import React from 'react';
import { Link } from 'react-router-dom';
import './LikeItem.scss';

const LikeItem = ({ deleteBtn, likeData }) => {
  const { id, name, price, detail_image } = likeData;
  const PRICE = Number(price).toLocaleString();

  return (
    <div className="LikeItem">
      <div
        className="like-out-btn"
        id={id}
        onClick={() => deleteBtn(id)}
      >
        x
      </div>

      <div className="LikeItem-wrap">
        <div className="img-container">
          <img src={`https://port-0-zinwoos-backend-fork-m1kb43jnab9bc7ab.sel4.cloudtype.app${detail_image}`} alt="관심상품 이미지" />
        </div>
        <Link className="likes-item-link" to={`/product_detail/${id}`}>
          <h2 className="likes-item-name">{name}</h2>
          <p className="likes-item-price">{PRICE}원</p>
        </Link>
      </div>
    </div>
  );
};

export default LikeItem;
