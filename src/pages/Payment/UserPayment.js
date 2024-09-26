import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserPayment.scss';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, itemName, price, optionPrice, totalPrice, quantity, detail_image } = location.state || {};

  const {name, email, address, phone_number} =  result.result[0];

  const [selectedOption, setSelectedOption] = useState(null);
  const [customInput, setCustomInput] = useState('');
  const [showTextarea, setShowTextarea] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownOnclick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setShowTextarea(false);
  }

  const handleButtonClick = () => {
    setShowTextarea(true);
    setIsOpen(true);
  }

  const handleTextareaChange = (event) => {
    setCustomInput(event.target.value);
  }

  const handleTextareaSubmit = () => {
    if (customInput.trim() !== '') {
      setSelectedOption('직접 입력');
      setIsOpen(false);
      setShowTextarea(false);
    } else {
      alert('내용을 입력해주세요')
    }
  }

  const handlePayButtonClick = () => {
    alert('결제가 완료되어 결제완료 페이지로 이동합니다!');
    navigate('/payment/complete', { state: { name, itemName, quantity } });
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const shippingCost = totalPrice >= 100000 ? 0 : 3000;

  return (
    <form className="userPaymentAll">
        <h1 name="title">주문서</h1>
        <div className="paymentDetail">
          <h2>주문 상세 내역</h2>
          <table>
            <thead class="option_thead">
              <tr>
                <th>상품/옵션 정보</th>
                <th>수량</th>
                <th>상품금액</th>
                <th>합계금액</th>
                <th>배송비</th>
              </tr>
              <tr>
                <th>{itemName} / {optionPrice ? 
                  (<h3>친필 사인</h3>) : (<h3 name="optionH3">옵션 선택 안함</h3>)
                }</th>
                <th>{quantity}</th>
                <th>{Number(price)} 원</th>
                <th>{totalPrice.toLocaleString()} 원</th>
                <th>{shippingCost.toLocaleString()} 원</th>
              </tr>
            </thead>
          </table>
        </div>
        <div>
          <h1 name="nameH1">주문자 정보</h1>
          <h2 name="nameH2">{name}</h2>
          <h2 name="addressH2">{address}</h2>
          <h2 name="phoneH2">{phone_number}</h2>
          
          <div>
            <button type="button" name="dropdownButton" onClick={toggleDropdown}>{selectedOption || "배송 요청사항을 선택해주세요"}</button>
            {isOpen && (
              <ul className="dropdownButtonUl">
              <li><button type="button" onClick={() => handleDropdownOnclick("문 앞에 놔주세요")}>문 앞에 놔주세요</button></li>
              <li><button type="button" onClick={() => handleDropdownOnclick("경비실에 맡겨주세요")}>경비실에 맡겨주세요</button></li>
              <li><button type="button" onClick={() => handleDropdownOnclick("택배함에 넣어주세요")}>택배함에 넣어주세요</button></li>
              <li><button type="button" onClick={() => handleDropdownOnclick("배송 전에 연락주세요")}>배송 전에 연락주세요</button></li>
              <label htmlFor="deliveryNote"><button type="button" onClick={handleButtonClick}>직접 입력</button></label>
            </ul>
            )}

            {showTextarea && (
              <div>
                <textarea
                  id="deliveryNote"
                  name="deliveryNote"
                  rows="4"
                  cols="50"
                  placeholder="예: 문 앞에 두고 초인종을 눌러주세요."
                  value={customInput}
                  onChange={handleTextareaChange}
                />
                <br />
                <button type="button" onClick={handleTextareaSubmit}>
                  완료
                </button>
              </div>
            )}

            {selectedOption === '직접 입력' && customInput && (
              <div>
                <p>{customInput}</p>
              </div>
            )}
          </div>
        </div>
      <div className="payment">
        <h2 name="paymentMethod">결제수단 선택 / 결제</h2>
        <ul>
          <li>계좌이체</li>
          <li>신용카드</li>
        </ul>
        <h3>최종 결제 금액 {totalPrice.toLocaleString()}원</h3>
        <button name="pay" onClick={handlePayButtonClick}>결제하기</button>
      </div>
    </form>
  )
}

export default PaymentPage;