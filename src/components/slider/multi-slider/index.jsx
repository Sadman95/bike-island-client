import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { brands } from '../../../backend/_mockdata';
import './index.css';
import PropTypes from 'prop-types';

const MultiSlider = ({
  itemsPerSlide = 3,
  initialStep = 0,
  stepDuration = 5000,
  autoChange = false,
  swipeable = false,
}) => {
  const [currentSlide, setCurrentSlide] = useState(initialStep);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [currentItemsPerSlide, setCurrentItemsPerSlide] = useState(itemsPerSlide);
  const totalSlides = Math.ceil(brands.length / itemsPerSlide);

  useEffect(() => {
    setCurrentItemsPerSlide(itemsPerSlide);
  }, [itemsPerSlide]);

  useEffect(() => {
    let interval;
    if (autoChange) {
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
      }, stepDuration);
    } else if (swipeable) {
      // Show swipe hint when component mounts or becomes swipeable
      setShowSwipeHint(true);
      setTimeout(() => setShowSwipeHint(false), 2000);
    }
    return () => clearInterval(interval);
  }, [autoChange, swipeable, stepDuration, totalSlides]);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextSlide,
    onSwipedRight: handlePrevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const displayedBrands = brands.slice(
    currentSlide * currentItemsPerSlide,
    currentSlide * currentItemsPerSlide + currentItemsPerSlide
  );

  return (
    <Box
      position="relative"
      width="100%"
      overflow="hidden"
      minHeight="300px"
      {...(swipeable ? swipeHandlers : {})}
    >
      {!autoChange && (
        <Box
          display="flex"
          alignItems="center"
          position="absolute"
          top={6}
          left={6}
          zIndex={2}
          sx={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          }}
          padding="8px"
          borderRadius="8px"
        >
          <IconButton onClick={handlePrevSlide}>
            <ArrowBackIos />
          </IconButton>
          <Box mx={2}>{`${currentSlide + 1}/${totalSlides}`}</Box>
          <IconButton onClick={handleNextSlide}>
            <ArrowForwardIos />
          </IconButton>
        </Box>
      )}
      {showSwipeHint && (
        <Box
          position="absolute"
          top={30}
          left="50%"
          transform="translateX(-50%)"
          zIndex={3}
          className="swipe-hint"
        >
          <ArrowBackIos sx={{ fontSize: 40 }} />
          <ArrowForwardIos sx={{ fontSize: 40 }} />
        </Box>
      )}
      <TransitionGroup>
        <CSSTransition key={currentSlide} timeout={500} classNames="slide">
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            width="100%"
            height="100%"
            className="slide"
          >
            {displayedBrands.map((brand) => (
              <Box
                key={brand.id}
                width={`${100 / currentItemsPerSlide}%`}
                padding={2}
                textAlign="center"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: '120px',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            ))}
          </Box>
        </CSSTransition>
      </TransitionGroup>
    </Box>
  );
};

MultiSlider.propTypes = {
  itemsPerSlide: PropTypes.number,
  initialStep: PropTypes.number,
  stepDuration: PropTypes.number,
  autoChange: PropTypes.bool,
  swipeable: PropTypes.bool,
};

export default MultiSlider;
