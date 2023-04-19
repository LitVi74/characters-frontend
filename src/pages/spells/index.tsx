import {FC} from 'react';
import {spells} from "../../const/spalls_const";
import MasonryContainer from "../../components/mansory container";

const Spells: FC= () => {
  return (
    <main className="w-100 flex-grow-1">
      <h1 className="text-center">
        Spells Page
      </h1>
      <MasonryContainer spells={spells} />
    </main>
  );
};

export default Spells;