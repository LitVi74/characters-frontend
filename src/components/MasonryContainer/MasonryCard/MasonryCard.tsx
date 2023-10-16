// Не переносить!!! MasonryCard должен использоваться исключительно в MasonryContainer!!!

import { useLayoutEffect, useRef } from "react";

import constants from "../../../constants/constants.scss";
import "./MasonryCard.scss";

interface PropsMasonryCard {
  cardWidth: number;
  children: JSX.Element;
}

export default function MasonryCard({ cardWidth, children }: PropsMasonryCard) {
  const card = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!card.current) return;

    const gap = +constants.gap.match(/^\d+/)[0];
    const rowHeight = +constants.rowHeight.match(/^\d+/)[0];

    card.current.classList.remove("masonry__card-ready");
    card.current.classList.add("masonry__card-calculation");

    card.current.style.width = `${cardWidth}px`;
    const height = card.current.offsetHeight;

    const rowSpan = Math.ceil((height + gap) / (rowHeight + gap));

    card.current.style.gridRowEnd = `span ${rowSpan}`;
    card.current.style.width = "";

    card.current.classList.remove("masonry__card-calculation");
    card.current.classList.add("masonry__card-ready");
  }, [cardWidth]);

  return (
    <div className="masonry__card masonry__card-ready" ref={card}>
      {!!cardWidth && children}
    </div>
  );
}
