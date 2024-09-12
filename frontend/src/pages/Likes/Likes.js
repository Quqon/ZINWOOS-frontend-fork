import React, { useEffect, useState } from 'react';
import LikeItem from './components/LikeItem';
import LikeNull from './components/LikeNull';
import './Likes.scss';

const Likes = () => {
  const [likeList, setLikeList] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(
    () => {
      fetch('http://127.0.0.1:3000/likes', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: token,
        },
      })
        .then(res => res.json())
        .then(result => {
          console.log(result.data, 'resultData')
          setLikeList(result.data)});
    },
    // eslint-disable-next-line
    []
  );

  // 삭제 버튼
  const deleteBtn = async (id) => {
    const response = await fetch(`http://127.0.0.1:3000/likes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    });

    if (response.status === 204) {
      alert('관심상품에서 삭제했습니다');
      fetch(`http://127.0.0.1:3000/likes/`, {
        headers: {
          Authorization: token,
        },
      })
        .then(res => res.json())
        .then(result => setLikeList(result.data));
    }
  };

  return (
    <div className="Likes">
      <div className="title-container">
        <h1 className="likes-title">관심상품</h1>
        <p className="count-likes">나의 관심상품 {likeList.length}</p>
      </div>

      <div className="like-line" />
      <div className="likes-item-container">
        {likeList.length === 0 ? (
          <LikeNull />
        ) : (
          likeList.map(product => {
            return (
              <LikeItem
                key={product.item_id}
                likeData={product}
                deleteBtn={deleteBtn}
                linkItemId={product.item_id}
              />
            );
          })
        )}
      </div>
      <div className="like-line" />
    </div>
  );
};

export default Likes;
