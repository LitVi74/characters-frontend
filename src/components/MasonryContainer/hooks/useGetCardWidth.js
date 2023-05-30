import { useCallback, useEffect, useState } from "react";
import constants from "../../../constants/constants.scss";

function useGetCardWidth(containerRef) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const handleResize = useCallback(() => {
    setTimeout(
      setContainerWidth.bind(null, containerRef.current?.clientWidth ?? 0),
      50
    );
  }, [containerRef]);

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
