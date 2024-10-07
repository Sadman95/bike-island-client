import React, { useEffect, useState } from 'react';
import {
  StyledHeader,
  StyledHeaderContent,
  StyledTypography,
} from '../../styled';

const Header = () => {
  const [text, setText] = useState(
    'Ride a Bike or Buy a Bike? Enjoy the Ride with Bike Island!'
  );

  useEffect(() => {
    let currentIndex = 0;
    const fullText = `Ride a Bike or Buy a Bike? 
      Enjoy the Ride with Bike Island!`;

    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    }, 100); // Adjust this value to change the speed of the animation

    return () => clearInterval(intervalId);
  }, []);

  return (
    <StyledHeader>
      <StyledHeaderContent>
        <StyledTypography
          color="white"
          fontWeight="bold"
          component="div"
        >
          {text}
        </StyledTypography>
      </StyledHeaderContent>
    </StyledHeader>
  );
};

export default Header;
