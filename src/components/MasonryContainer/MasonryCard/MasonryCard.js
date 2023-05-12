// Не переносить!!! MasonryCard должен использоваться исключительно в MasonryContainer!!!

import constants from '../../../constants/constants.scss';
import "./MasonryCard.scss";

import { useLayoutEffect, useRef } from "react";


export default function MasonryCard({cardWidth, children}) {
  const card = useRef(null);

  useLayoutEffect(() => {
    if (card.current === undefined) return;

    const gap = +constants.gap.match(/^\d+/)[0];
    const rowHeight = +constants.rowHeight.match(/^\d+/)[0];

    card.current.classList.remove("masonry__card-ready");
    card.current.classList.add("masonry__card-calculation");

    card.current.style.width = cardWidth + "px";
    const height = card.current.offsetHeight;

    const rowSpan = Math.ceil((height + gap)/(rowHeight + gap));

    card.current.style.gridRowEnd = 'span ' + rowSpan;
    card.current.style.width = "";

    card.current.classList.remove("masonry__card-calculation");
    card.current.classList.add("masonry__card-ready");
  },[cardWidth]);

  return (
    <div className="masonry__card masonry__card-ready" ref={card}>
      { children }
    </div>
  );
}