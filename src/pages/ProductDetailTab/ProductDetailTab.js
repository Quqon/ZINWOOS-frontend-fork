import React, { useState } from 'react';
import DetailTab from './components/DetailTab';
import ReviewTab from './components/ReviewTab';
import QaTab from './components/QaTab';
import RefundTab from './components/RefundTab';
import './ProductDetailTab.scss';

const ProductDetailTab = ({ product }) => {
  const [currentId, setCurrentId] = useState(1);

  const tabHandler = e => {
    setCurrentId(e);
  };

  const TAB_OBJ = {
    1: <DetailTab product={product} />,
    2: <ReviewTab />,
    3: <QaTab />,
    4: <RefundTab />,
  };

  return (
    <div className="ProductDetailTab">
      <div className="detail-menu-bar">
        <ul className="tabs">
          {TAB_TITLE.map(tab => {
            const { id, name } = tab;
            return (
              <li
                key={name + id}
                className={currentId === id ? 'tab active' : 'tab'}
                onClick={() => tabHandler(id)}
              >
                {name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="tab-line" />

      {TAB_OBJ[currentId]}
    </div>
  );
};

export default ProductDetailTab;

const TAB_TITLE = [
  { id: 1, name: '상세정보' },
  { id: 2, name: '리뷰' },
  { id: 3, name: 'Q&A' },
  { id: 4, name: '배송/환불' },
];
