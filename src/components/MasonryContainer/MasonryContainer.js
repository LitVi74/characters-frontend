import './MasonryContainer.scss'

import { useRef } from "react";
import { useGetCardWidth } from "./hooks/useGetCardWidth";
import MasonryCard from "../MasonryCard/MasonryCard";

export default function MasonryContainer({cbShow, spells}) {
  const ref = useRef(null);
  const cardWidth = useGetCardWidth(ref);

  return (
    <section className="masonry__container" ref={ref}>
      {spells.map((spell) =>
      <MasonryCard key={spell._id} cbShow={cbShow} spell={spell} cardWidth={cardWidth} />
      )}
    </section>
  );
}