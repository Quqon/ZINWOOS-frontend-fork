import React from 'react';
import './ReviewTab.scss';

const ReviewTab = () => {
  return (
    <section className="ReviewTab">
      <div className="review-wrap">
        <div className="review-title-wrap">
          <h3 className="review-title">리뷰</h3>
          <div className="review-btn-wrap">
            <button className="review-btn-total">리뷰 전체보기</button>
            <button className="review-btn-up">리뷰 등록</button>
          </div>
        </div>

        <div className="review-tab-line" />
        <ul className="reviews">등록된 상품후기가 없습니다.</ul>
        <div className="review-tab-line" />
      </div>
    </section>
  );
};

export default ReviewTab;
