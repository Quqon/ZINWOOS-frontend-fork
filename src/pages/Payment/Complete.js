import React from 'react';
import { useLocation } from 'react-router-dom';
import './Complete.scss';

const Complete = () => {
  const location = useLocation();
  const { name, itemName, quantity } = location.state || {};
  return (
    <div className="all">
      <h1>주문이 완료되었습니다!</h1>
      <h2>{name}님 {itemName}상품을 {quantity}개 주문해주셔서 감사합니다.</h2>
      <h3>배송조회는 상품 배송이 시작되면 마이페이지에서 확인하실수 있습니다.</h3>
    </div>
  )
}

export default Complete;