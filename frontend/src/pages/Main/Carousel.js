import React, { useEffect, useState } from 'react';
import CarouselButton from './CarouselButton';
import './Carousel.scss';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [animate, setAnimate] = useState('animation');

  const prevBtn = () => {
    setCurrentIndex(currentIndex + 1);
    if (currentIndex === 0) {
      setAnimate('');
      return setCurrentIndex(-4);
    }
    setAnimate('animation');
  };

  const nextBtn = () => {
    setCurrentIndex(currentIndex - 1);
    if (currentIndex === -5) {
      setAnimate('');
      return setCurrentIndex(-1);
    }
    setAnimate('animation');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(current => current - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === -1 * (MAIN_CAROUSEL.length - 1)) {
      setTimeout(() => {
        setAnimate('');
        setCurrentIndex(-1);
      }, 500);
      setTimeout(() => {
        setAnimate('animation');
      }, 600);
    }
  }, [currentIndex]);

  return (
    <div className="Carousel">
      <div
        className={`carousel-container ${animate}`}
        style={{
          transform: `transLateX(${currentIndex}00vw`,
        }}
      >
        {MAIN_CAROUSEL.map((item, index) => {
          return (
            <img
              className="main-pic"
              key={index}
              src={item.src}
              alt={item.name}
            />
          );
        })}
      </div>

      <CarouselButton click="prev" onClick={prevBtn} />
      <CarouselButton click="next" onClick={nextBtn} />
    </div>
  );
};

export default Carousel;

const MAIN_CAROUSEL = [
  {
    id: 0,
    name: '진우님-메인사진4',
    src: 'images/Main/n_IMG_5588.jpg',
  },
  {
    id: 1,
    name: '진우님-메인사진1',
    src: 'images/Main/IMG_2046.jpg',
  },
  {
    id: 2,
    name: '진우님-메인사진2',
    src: 'images/Main/IMG_2282.jpg',
  },
  {
    id: 3,
    name: '진우님-메인사진3',
    src: 'images/Main/n_IMG_5104.jpg',
  },
  {
    id: 4,
    name: '진우님-메인사진4',
    src: 'images/Main/n_IMG_5588.jpg',
  },
  {
    id: 5,
    name: '진우님-메인사진1',
    src: 'images/Main/IMG_2046.jpg',
  },
];
