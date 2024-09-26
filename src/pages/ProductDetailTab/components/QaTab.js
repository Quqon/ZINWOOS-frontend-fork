import React from 'react';
import './QaTab.scss';

const QaTab = () => {
  return (
    <section className="QaTab">
      <div className="qnA-wrap">
        <div className="review-title-wrap">
          <h3 className="review-title">Q&A</h3>
          <div className="review-btn-wrap">
            <button className="review-btn-total">고객센터</button>
            <button className="review-btn-up">Q&A 등록</button>
          </div>
        </div>

        <div className="review-tab-line" />
        <ul className="reviews">등록된 Q&A가 없습니다.</ul>
        <div className="review-tab-line" />
      </div>
    </section>
  );
};

export default QaTab;
