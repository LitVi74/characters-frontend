import { Accordion, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import "./Filters.scss";
import { IFilter } from "../../constants/IConstants";

interface PropsFilters {
  className?: string;
  filters: IFilter[];
}

function Filters({ filters, className }: PropsFilters) {
  return (
    <Accordion defaultActiveKey={["0"]} className={className} alwaysOpen>
      {filters.map((filter, index) => (
        <Accordion.Item key={filter.name} eventKey={index.toString()}>
          <Accordion.Header>{filter.name}</Accordion.Header>
          <Accordion.Body>
            <ToggleButtonGroup
              className="flex-wrap"
              type="checkbox"
              value={filter.selectedValue}
              onChange={filter.onChange}
            >
              {filter.values.map((value, valueIndex) => (
                <ToggleButton
                  className="m-1 rounded flex-grow-0"
                  key={value}
                  id={`tgb-${index}-${value}`}
                  value={value}
                  variant="outline-warning"
                >
                  {filter?.valuesName?.[valueIndex] ?? value}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

Filters.defaultProps = {
  className: "",
}

export default Filters;