import "./MasonryContainer.scss";

import { useRef } from "react";

import MasonryCard from "./MasonryCard/MasonryCard";
import { useGetCardWidth } from "./hooks/useGetCardWidth";

interface PropsMasonryContainer {
  children: JSX.Element[];
}

export default function MasonryContainer({ children }: PropsMasonryContainer) {
  const ref = useRef<HTMLSelectElement>(null);
  const cardWidth = useGetCardWidth(ref);

  return (
    <section className="masonry__container" ref={ref}>
      {children?.map((element, index: number) => (
        <MasonryCard key={`m-card-${element?.key || index}`} cardWidth={cardWidth}>
          {element}
        </MasonryCard>
      ))}
    </section>
  );
}
