import React from 'react';
import './RefundTab.scss';

const RefundTab = () => {
  return (
    <section className="RefundTab">
      <div className="refund-wrap">
        <h1 className="refund-title">배송/반품/교환</h1>
        <h2 className="refund-sub-title">배송안내</h2>
        <p className="refund-text">
          오후 3시까지 주문하시면 익일 출고 (주말, 공휴일 제외) <br /> 제품
          배송일/수령일은 지정이 불가한 점 참고해주세요.
        </p>

        <h2 className="refund-sub-title">교환 및 반품</h2>
        <p className="refund-text">
          교환 및 반품 신청은 제품 수령일로부터 7일 이내, 구매 영수증과 함께
          신청해주세요.
          <br /> 제품 하자 및 불량으로 인한 반품 및 교환 배송비는 판매처에서
          부담합니다.
          <br /> 단순 변심 반품의 경우 왕복 배송비가 청구되며, 상품마다 다르게
          부과됩니다.
          <br /> 하단의 표를 참조해주세요.
        </p>

        <table className="refund-table">
          <thead className="refund-table-head">
            <tr className="refund-table-wrap">
              <th className="table-item">품목</th>
              <th className="table-item">반품배송비(왕복)</th>
            </tr>
          </thead>

          <tbody className="refund-table-in">
            {REFUND_DATA.map((item, index) => {
              return (
                <tr key={index} className="refund-table-tr">
                  <td className="table-datas">{item.category}</td>
                  <td>{item.refund}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="refund-tip">
          배송 당일에 배송일과 모델을 변경하거나 제품 취소 시 부과되는 별도
          비용, 수취인 부재 시나 거부 또는 주소지 및 연락처 오류로 인한 반송
          배송비는 고객님 부담입니다.
        </p>
      </div>
    </section>
  );
};

export default RefundTab;

const REFUND_DATA = [
  {
    category: 'ITEMS',
    refund: '교환/환불 불가',
  },
  {
    category: 'GOODS',
    refund: '5,000원',
  },
  {
    category: 'TIME',
    refund: '교환/환불 불가',
  },
];
