import React, { useState, useEffect } from 'react';
import './PriceCalculator.scss';
import { useNavigate } from 'react-router-dom';

const PriceCalculator = ({
  name,
  productId,
  price,
  max_amount,
  detail_image
}) => {
  const [optionPrice, setOptionPrice] = useState(0);
  const [optionId, setOptionId] = useState(null);
  const itemName = name;
  const [quantity, setQuantity] = useState(1);
  const totalPrice = (Number(price) + optionPrice) * quantity;
  const [wishList, setWishList] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || localStorage.getItem('adminAccessToken'));
  const [product, setProduct] = useState('');
  const [nonCartList, setNonCartList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const setTokenHandler = () => {
      setToken(localStorage.getItem('token') || localStorage.getItem('adminAccessToken'));
    };
    
    window.addEventListener('storage', setTokenHandler);

    return () => {
      window.removeEventListener('storage', setTokenHandler);
    };
  }, []);

  const optionHandler = e => {
    if (e.target.value) {
      setOptionPrice(30000);
      setOptionId(Number(e.target.value));
    } else {
      setOptionPrice(0);
      setOptionId(null);
    }
  };

  const paymentHandler = async () => {
    if (token) {
      try {
        const response = await fetch('http://127.0.0.1:3000/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: token,
          },
        });
        if (response.status !== 201) {
          console.error('Error: ', response.statusText);
        }
        const result = await response.json();
        navigate('/payment/user', { state: { result, itemName, price, optionPrice, totalPrice, quantity, detail_image } });
      } catch (error) {
        console.error('Error: ', error);
      }
    } else {
      navigate('/payment', { state: { itemName, price, optionPrice, totalPrice, quantity, detail_image }});
    }
  };

  const addCartHandler = async() => {
    try {
      if (token) {
        fetch('http://127.0.0.1:3000/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: token,
          },
          body: JSON.stringify({
            itemId: productId,
            optionId: optionId,
            quantity: quantity,
          }),
        }).then(result => {
          if (result.status === 201) {
            alert('장바구니에 상품이 담겼습니다!');
          }
        });
      } else {
        fetch('http://127.0.0.1:3000/carts/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('sessionId')
          },
          credentials: 'include',
          body: JSON.stringify({
            itemId: productId,
            optionId: optionId,
            quantity: quantity,
            itemName: itemName,
            detail_image: detail_image,
            id: productId,
            checkbox: true,
            price: price
          })
        })
        .then(response => {
          if (response.status === 200) {
            alert('장바구니에 상품이 담겼습니다!');
            return response.json();
          } else {
            throw new Error(`Error: ${response.statusText}`);
          }
        })
        .then(data => {
          const result = data.cart;
          navigate('/nonCarts', { state: { result }})
        })

      }
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  }

  const addWishList = e => {
    e.preventDefault();
    if (token) {
      setWishList(!wishList);
      fetch('http://127.0.0.1:3000/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: token,
        },
        body: JSON.stringify({
          itemId: productId,
        }),
      }).then(response => {
        if (response.status === 201) {
          alert('관심상품에 추가되었습니다!');
        }
      });
    } else {
      alert('로그인 후 관심상품 등록이 가능합니다!');
    }
  };

  const minusQuantity = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const plusQuantity = () => {
    setQuantity(quantity < max_amount ? quantity + 1 : quantity);
  };

  return (
    <div className="PriceCalculator">
      <div className="product-item-contents-option">
        <h2 className="product-item-contents-option-title">추가상품</h2>
        <select className="option-selector" onChange={optionHandler}>
          <option value="">선택안함</option>
          <option value="1">친필사인 추가(+30,000원)</option>
        </select>
      </div>
      <div className="quantity">
        <button className="quantity-minus-button" onClick={minusQuantity}>
          <i className="fa-solid fa-minus" />
        </button>
        <input className="quantity-input" value={quantity} type="number" readOnly />
        <button className="quantity-plus-button" onClick={plusQuantity}>
          <i className="fa-solid fa-plus" />
        </button>
      </div>
      <div className="product-item-contents-price">
        <h2 className="product-item-contents-option-title">총 상품금액</h2>
        <div className="total-price">{`${totalPrice.toLocaleString()} 원`}</div>
      </div>
      <form className="product-item-contents-buttons">
        <input className="payment-button" type="button" value="결제하기" onClick={paymentHandler}/>
        <input
          className="cart-button"
          type="button"
          value="장바구니"
          onClick={addCartHandler}
        />
        <button
          disabled={wishList}
          onClick={addWishList}
          className="heart-button"
        >
          <i
            className={!wishList ? 'fa-regular fa-heart' : 'fa-solid fa-heart'}
          />
        </button>
      </form>
    </div>
  );
};

export default PriceCalculator;
