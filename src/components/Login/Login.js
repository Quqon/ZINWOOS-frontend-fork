import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = ({ modalLogin, setShowLogin }) => {
  const [typeOfForm, setTypeOfForm] = useState('로그인');
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    address: '',
  });
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/;
    return re.test(password)
  }

  const isLoginValid =
    inputValue.email.includes('@') && inputValue.password.length > 4;

  const isSignupVaild =
    inputValue.email.includes('@') &&
    validatePassword(inputValue.password) &&
    inputValue.name.length > 1 &&
    inputValue.phoneNumber.length >= 10 &&
    inputValue.address.length >= 1;

  const handleInput = event => {
    const { name, value } = event.target;

    setInputValue({ ...inputValue, [name]: value });
    // eslint-disable-next-line
  };

  const handleLogin = e => {
    e.preventDefault();
    fetch('http://127.0.0.1:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // eslint-disable-next-line
        if (data.accessToken) {
          alert('환영합니다');
          setShowLogin(false);
          localStorage.setItem('token', data.accessToken);
          window.location.reload();
        } else if (data.adminAccessToken) {
          alert('관리자님 환영합니다');
          setShowLogin(false);
          localStorage.setItem('adminAccessToken', data.adminAccessToken);
          navigate('/users/admin');
        } 
        else if (data.message === 'INVALID_USER') {
          alert('등록되지 않은 사용자입니다.');
        }
      });
  };

  const handleSignUp = e => {
    e.preventDefault();
    // eslint-disable-next-line
    console.log('Sign up button clicked');
    fetch('http://127.0.0.1:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
        name: inputValue.name,
        phoneNumber: inputValue.phoneNumber,
        address: inputValue.address,
      }),
    }).then(() => {
      alert('가입성공');
      setTypeOfForm('로그인');
    });
  };

  const handleForm = () => {
    if (typeOfForm === '로그인') {
      setTypeOfForm('회원가입');
    } else {
      setTypeOfForm('로그인');
    }
  };

  const submitValue = e => {
    e.preventDefault();
  };

  return (
    <div className="Login">
      <div className="login-box">
        <div className="close-btn">
          <button onClick={modalLogin}>
            <i className="fa-solid fa-x" />
          </button>
        </div>
        <img
          className="login-logo"
          src="https://github.com/ChoiRamsey/zinwoos/blob/main/LOGO_ZINWOOS(%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC).png?raw=true"
          alt="zinwoos logo"
        />
        <p>지누스 회원이라면 계정으로 로그인 하세요</p>
        <form onSubmit={submitValue}>
          <div className="input-container">
            <input
              name="email"
              type="text"
              placeholder="이메일"
              onChange={handleInput}
            />
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              onChange={handleInput}
            />
            {typeOfForm === '회원가입' && (
              <>
                <input
                  name="name"
                  type="text"
                  placeholder="이름"
                  onChange={handleInput}
                />
                <input
                  id="phone-input"
                  name="phoneNumber"
                  type="number"
                  placeholder="전화번호"
                  onChange={handleInput}
                />
                <input
                  name="address"
                  type="text"
                  placeholder="주소"
                  onChange={handleInput}
                />
              </>
            )}
          </div>
          <div className="sign-inup-btn">
            {typeOfForm === '로그인' ? (
              <button disabled={!isLoginValid} onClick={handleLogin}>
                로그인
              </button>
            ) : (
              <button disabled={!isSignupVaild} onClick={handleSignUp}>
                회원가입
              </button>
            )}
          </div>
        </form>
        {typeOfForm === '로그인' ? (
          <div className="change-input-type" onClick={handleForm}>
            계정이 없으신가요? 회원가입
          </div>
        ) : (
          <div className="change-input-type" onClick={handleForm}>
            이미 가입하셨나요? 로그인
          </div>
        )}
      </div>
    </div>
  );
};
export default Login;
