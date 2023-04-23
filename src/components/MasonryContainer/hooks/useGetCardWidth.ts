import {RefObject, useCallback, useEffect, useState} from "react";
import constants from "../_constants.scss";

function useGetCardWidth (containerRef: RefObject<HTMLDivElement>) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const handleResize = useCallback(() => {
    setContainerWidth(containerRef.current?.clientWidth ?? 0);
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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