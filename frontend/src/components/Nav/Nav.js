import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Login from '../Login/Login';
import Dropdown from './Dropdown';
import './Nav.scss';

const Nav = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const getLogout = () => {
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('token');
    window.location.reload();
  };

  const onMouseOver = () => {
    setIsHovering(true);
  };
  const onMouseOut = () => {
    setIsHovering(false);
  };
  const modalLogin = () => {
    setShowLogin(!showLogin);
  };
  const likeProduct = () => {
    if (localStorage.getItem('token') || localStorage.getItem('accessAccessToken')) {
      navigate("/likes");
    } else {
      alert('로그인이 필요한 요청입니다.');
      navigate("/");
    }
  }

  return (
    <div className="Nav">
      <div className="container">
        <div className="nav-logo">
          <Link to="/">
            <img
              src="https://github.com/ChoiRamsey/zinwoos/blob/main/LOGO_ZINWOOS(%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC).png?raw=true"
              alt="ZINWOOS"
            />
          </Link>
        </div>
        <div className="nav-menu">
          <div>BRAND</div>
          <Link to="/product_list/all/0">
            <div onMouseOver={onMouseOver}>SHOP</div>
          </Link>
          <div>GALLERY</div>
          <div>SUPPORT</div>
        </div>
        <div className="nav-control">
          {localStorage.getItem('token') || localStorage.getItem('adminAccessToken') ? (
            <div className="nav-right-tab" onClick={getLogout}>
              Log out
            </div>
          ) : (
            <div className="nav-right-tab" onClick={modalLogin}>
              Login & SignUp
            </div>
          )}
          <div className="nav-right-tab" onClick={likeProduct}>관심상품</div>
          <Link to="#">
            <div className="nav-right-tab">주문배송</div>
          </Link>
          {localStorage.getItem('token') || localStorage.getItem('adminAccessToken') ? (
            <Link to="/carts">
            <div>장바구니</div>
          </Link>
          ) : (
            <Link to="/nonCarts">
            <div>장바구니</div>
          </Link>
          )}
        </div>
      </div>

      <Dropdown
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
        isHovering={isHovering}
      />

      {showLogin && (
        <Login setShowLogin={setShowLogin} modalLogin={modalLogin} />
      )}
    </div>
  );
};

export default Nav;
