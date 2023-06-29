import "./MasonryContainer.scss";

import { useRef } from "react";

import MasonryCard from "./MasonryCard/MasonryCard";
import { useGetCardWidth } from "./hooks/useGetCardWidth";

export default function MasonryContainer({ children }) {
  const ref = useRef(null);
  const cardWidth = useGetCardWidth(ref);

  return (
    <section className="masonry__container" ref={ref}>
      {children?.map((element, index) => (
        <MasonryCard key={`m-card-${element?.key || index}`} cardWidth={cardWidth}>
          {element}
        </MasonryCard>
      ))}
    </section>
  );
}
