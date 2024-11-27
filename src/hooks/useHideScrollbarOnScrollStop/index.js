import { useEffect, useState } from 'react';

const useHideScrollbarOnScrollStop = (scrollRef, timeoutDelay = 1000) => {
  const [showScrollbar, setShowScrollbar] = useState(true);
  let timeout;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollbar(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowScrollbar(false), timeoutDelay);
    };

    const scrollElement = scrollRef.current;

    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);

      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
        clearTimeout(timeout);
      };
    }
  }, [scrollRef, timeoutDelay]);

  return showScrollbar;
};

export default useHideScrollbarOnScrollStop;
