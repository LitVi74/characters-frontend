import {FormControl} from "react-bootstrap";
import IconButton from "../IconButton/IconButton";
import {Funnel} from "react-bootstrap-icons";

const SpellFilters = () => {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2 p-lg-5">
      <FormControl />
      <IconButton variant="outline-primary" icon={<Funnel />} />
    </div>
  );
};

export default SpellFilters;