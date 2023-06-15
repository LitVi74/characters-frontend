import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import constants from "../../../constants/constants.scss";

function useGetCardWidth(containerRef) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const handleResize = useCallback(() => {
    setTimeout(() => setContainerWidth(containerRef.current?.clientWidth ?? 0), 50);
  }, [containerRef.current?.clientWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useLayoutEffect(() => {
    if (!containerWidth) return;

    const gap = +constants.gap.match(/^\d+/)[0];
    const minCardWidth = +constants.minCardWidth.match(/^\d+/)[0];

    const cardCount = Math.floor((containerWidth + gap) / (minCardWidth + gap));
    const cardWidth = (containerWidth - (cardCount - 1) * gap) / cardCount;

    setCardWidth(cardWidth);
  }, [containerWidth]);

  return cardWidth;
}

export { useGetCardWidth };
