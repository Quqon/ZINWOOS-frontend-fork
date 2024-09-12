import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <section className="Footer">
      <div className="footer-container">
        <div className="footer-data-policy">
          <span className="footer-logo-wrap">
            <img
              src="https://github.com/ChoiRamsey/zinwoos/blob/main/LOGO_ZINWOOS(white).png?raw=true"
              className="footer-logo"
              alt="zinwooslogo"
            />
          </span>

          {FOOTER_DATA.map(data => (
            <Link to="" key={data.id} className="footer-data">
              {data.text}
            </Link>
          ))}

          <div className="policy-wrap">
            <p className="footer-policy">
              <span>상호명 : (주)ZINWOOS</span>
              <span>대표 : 이가을</span>
              <span>메일 : zinwoos@gmail.com</span>
            </p>
            <p className="footer-policy">
              <span>전화 : 031 - 273 - 4442</span>
              <span>팩스 : 031 - 273 - 5444</span>
              <span>주소 : 서울특별시 강남구 테헤란로 427</span>
            </p>
            <p className="footer-policy">
              <span>개인정보관리자 : 김성식 / 정인호 / 최진우</span>
              <span>통신판매업신고번호 : 2022-서울-0920</span>
              <span>© ZINWOOS</span>
            </p>
          </div>
        </div>

        <div className="customer-center">
          <h5 className="customer-center-title">고객센터</h5>
          <h5 className="customer-center-number">1111-2222</h5>
          <p className="customer-center-time">
            평일 10:00 ~ 17:00
            <br />
            점심 시간 12:00 ~ 13:00
            <br />
            (토요일, 일요일, 공휴일 휴무)
          </p>
          <div className="footer-logo-wrap">
            <div className="insta-logo">
              <i className="fa-brands fa-instagram" />
            </div>
            <div className="youtube-logo">
              <i className="fa-brands fa-youtube" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

const FOOTER_DATA = [
  {
    id: 'footer01',
    text: 'ZIN USA',
    url: '',
  },
  {
    id: 'footer02',
    text: 'IR',
  },
  {
    id: 'footer03',
    text: '공지사항',
  },
  {
    id: 'footer04',
    text: '제휴 문의',
  },
  {
    id: 'footer05',
    text: '이용약관',
  },
  {
    id: 'footer06',
    text: '개인정보취급방침',
  },
  {
    id: 'footer07',
    text: '윤리경영',
  },
  {
    id: 'footer08',
    text: 'ESG',
  },
];
