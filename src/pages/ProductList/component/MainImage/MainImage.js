import React from 'react';
import './MainImage.scss';

const MainImage = ({ mainTitle, mainText }) => {
  return (
    <div className="MainImage">
      <img
        src="/images/ProductList/zinwoosmain.jpg"
        alt="team-master"
        className="main-model"
      />
      <div className="main-header">
        <div>
          <p className="header-name">{mainTitle}</p>
        </div>
        <div className="second-header">{mainText}</div>
        <div>
          <a href="#tag" className="scroll-move">
            제품 바로보기
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainImage;
