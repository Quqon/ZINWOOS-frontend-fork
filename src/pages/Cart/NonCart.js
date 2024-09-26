import { React, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NonListTable from './NonListTable';

import './Cart.scss';
import { check } from 'prettier';

const NonCart = () => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminAccessToken');
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipFee, setShipFee] = useState(3000);
  const location = useLocation();
  const sessionId = sessionStorage.getItem('sessionId');

  const result = !token && location.state ? location.state.result : null;


  useEffect(() => {
    fetch('http://127.0.0.1:3000/carts/non', {
      headers: { Authorization: sessionId },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => setCartList(data.cart))
  }, [])

  useEffect(() => {
    if (result) {
      setCartList(result);
    }
  }, [result])
  

  useEffect(() => {
    const copy = [...(cartList.cartList || [])];
    const buyList = copy.filter(item => Boolean(item.checkbox));

    let price = 0;
    buyList.forEach(item => {
      price += item.quantity * (Number(item.price) + (item?.optionName ? 30000 : 0));
    });

    price >= 100000 ? setShipFee(0) : setShipFee(3000);
    price === 0 && setShipFee(0);
    setTotalPrice(price);
  }, [cartList]);

  const submitOrder = async () => {
    const orderList = cartList.filter(item => item.checkbox === 1);
    const response = await fetch(`http://127.0.0.1:3000/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        items: orderList,
      }),
    });

    if (response.status === 200) {
      alert('주문성공');
      const response = await fetch('http://127.0.0.1:3000/orders', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      // eslint-disable-next-line
      const data = await response.json();
    }
  };

  return (
    <div className="Cart">
      <div className="container">
        <div className="content">
          <div className="contents">
            <div className="order-page">
              <div className="title">
                <h1>장바구니</h1>
              </div>
              <div className="cart-list">
                <NonListTable cartList={cartList} setCartList={setCartList} />
                <div className="price-box">
                  <ul>
                    <li>
                      <div>합계금액</div>
                      <div>{`${totalPrice.toLocaleString()} 원`}</div>
                    </li>
                    <li>
                      <i className="fa-solid fa-minus" />
                      <div>할인 금액 합계</div>
                      <div>0원</div>
                    </li>
                    <li>
                      <i className="fa-solid fa-plus" />
                      <div>배송비</div>
                      {totalPrice === 0 ? (
                        <div>상품을 추가 시 결정</div>
                      ) : (
                        <div>{totalPrice >= 100000 ? '무료' : '3,000원'}</div>
                      )}
                    </li>
                    <li>
                      <i className="fa-solid fa-equals" />
                      <div>결제 예정 금액</div>
                      <div>
                        {totalPrice >= 100000
                          ? `${totalPrice.toLocaleString()}원`
                          : `${(totalPrice + shipFee).toLocaleString()}원`}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="complete-btn">
                <Link to="/">
                  <button>쇼핑 계속하기</button>
                </Link>
                <button onClick={submitOrder}>주문하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonCart;
