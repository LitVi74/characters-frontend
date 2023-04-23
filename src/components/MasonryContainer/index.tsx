import {FC, useRef} from "react";
import './masonry-container.scss'
import {IMasonryContainerProps} from "./interface";
import {useGetCardWidth} from "./hooks/useGetCardWidth";
import MasonryCard from "./masonry card";

const MasonryContainer: FC<IMasonryContainerProps> = ({spells}) => {
  const ref = useRef<HTMLDivElement>(null);
  const cardWidth = useGetCardWidth(ref);

  return (
    <section className="masonry__container" ref={ref}>
      {spells.map((spell) =>
      <MasonryCard key={spell._id} spell={spell} cardWidth={cardWidth} />
      )}
    </section>
  );
};

export default MasonryContainer;