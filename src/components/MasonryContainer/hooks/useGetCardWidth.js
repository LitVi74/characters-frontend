import constants from '../../../const/_constants.scss';

import {useCallback, useEffect, useState} from "react";

function useGetCardWidth (containerRef) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const handleResize = useCallback(() => {
    setContainerWidth(containerRef.current?.clientWidth ?? 0);
  }, [containerRef])

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    const gap = +constants.gap.match(/^\d+/)[0];
    const minCardWidth = +constants.minCardWidth.match(/^\d+/)[0];

    const cardCount = Math.floor((containerWidth + gap) / (minCardWidth + gap));
    const cardWidth = (containerWidth - (cardCount - 1) * gap) / cardCount;

    setCardWidth(cardWidth);
  }, [containerWidth]);

  return cardWidth;
}

export { useGetCardWidth };