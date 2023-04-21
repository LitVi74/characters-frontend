import {FC} from "react";
import {Container, Form} from 'react-bootstrap';
import {ISpellFormProps} from "./SpellFormInerface";
import {useFormik} from "formik";

const SpellForm: FC<ISpellFormProps> = ({spell}) => {
  const formik = useFormik({
    initialValues: {
      name: spell?.name ?? "",
      level: spell?.level ?? 0,
      school: spell?.school ?? "",
      casting_time: spell?.casting_time ?? "",
      range: spell?.range ?? 0,
      components: spell?.components ?? [] as string[],
      material: spell?.material ?? "",
      concentration: spell?.concentration ?? false,
      duration: spell?.duration ?? "",
      classes: spell?.classes ?? [] as string[],
      desc: spell?.desc ?? "",
      higher_level: spell?.higher_level ?? ""
    },
    onSubmit: (values) => { console.log(values)},
  })

  return (
    <Form id={`spell-${spell ? spell._id : "add"}-form`} onSubmit={formik.handleSubmit}>
      <Form.Group controlId="spell-name">
        <Form.Label>Название</Form.Label>
        <Form.Control
          name="name"
          type="text"
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="spell-level">
        <Form.Label>Название</Form.Label>
        <Form.Select name="level" onChange={formik.handleChange} defaultValue={formik.initialValues.level}>
          <option value={0}>Заговор</option>
          <option value={1}>1 уровень</option>
          <option value={2}>2 уровень</option>
          <option value={3}>3 уровень</option>
          <option value={4}>4 уровень</option>
          <option value={5}>5 уровень</option>
          <option value={6}>6 уровень</option>
          <option value={7}>7 уровень</option>
          <option value={8}>8 уровень</option>
          <option value={8}>9 уровень</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="spell-school">
        <Form.Label>Школа</Form.Label>
        <Form.Select name="school" onChange={formik.handleChange} defaultValue={formik.initialValues.school}>
          <option hidden value=""> </option>
          <option value="Вызов">Вызов</option>
          <option value="Воплощение">Воплощение</option>
          <option value="Иллюзия">Иллюзия</option>
          <option value="Некромант">Некромант</option>
          <option value="Ограждение">Ограждение</option>
          <option value="Очарование">Очарование</option>
          <option value="Преобразование">Преобразование</option>
          <option value="Прорицание">Прорицание</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="spell-cast-time">
        <Form.Label>Время накладывания</Form.Label>
        <Form.Select
          name="casting_time"
          onChange={formik.handleChange}
          defaultValue={formik.initialValues.casting_time}
        >
          <option hidden value=""> </option>
          <option value="1 бонусное действие">бонусное действие</option>
          <option value="1 реакция">реакция</option>
          <option value="1 действие">дейсвие</option>
          <option value="1 ход">ход</option>
          <option value="1 минута">минута</option>
          <option value="10 минут">10 минут</option>
          <option value="1 час">час</option>
          <option value="8 часов">8 часов</option>
          <option value="12 часов">12 часов</option>
          <option value="24 часов">24 часов</option>
        </Form.Select>
      </Form.Group>
      <Form.Group >
        <Form.Label>Компоненты</Form.Label>
        <Container className="d-flex m-0 p-0 gap-2">
          <Form.Check
            name="components"
            defaultChecked={formik.initialValues.components.includes("В")}
            label={"В"}
            value={"В"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="spellComponents"
            defaultChecked={formik.initialValues.components.includes("С")}
            label={"С"}
            value={"С"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="spellComponents"
            defaultChecked={formik.initialValues.components.includes("М")}
            label={"М"}
            value={"М"}
            onChange={formik.handleChange}
          />
        </Container>
      </Form.Group>
      <Form.Group controlId="spell-material">
        <Form.Label>Материалы</Form.Label>
        <Form.Control
          as="textarea"
          name="material"
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Check
        type="switch"
        name="concentration"
        label="Концентрация"
        onChange={formik.handleChange}
      />
      <Form.Group controlId="spell-duration">
        <Form.Label>Длительность</Form.Label>
        <Form.Control
          name="duration"
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group >
        <Form.Label>Классы</Form.Label>
        <Container className="d-flex m-0 p-0 gap-2 flex-wrap">
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.components.includes("Бард")}
            label={"Бард"}
            value={"Бард"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.components.includes("Волшебник")}
            label={"Волшебник"}
            value={"Волшебник"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.components.includes("Друид")}
            label={"Друид"}
            value={"Друид"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.components.includes("Жрец")}
            label={"Жрец"}
            value={"Жрец"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.components.includes("Колдун")}
            label={"Колдун"}
            value={"Колдун"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.components.includes("Паладин")}
            label={"Паладин"}
            value={"Паладин"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.components.includes("Следопыт")}
            label={"Следопыт"}
            value={"Следопыт"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.components.includes("Чародей")}
            label={"Чародей"}
            value={"Чародей"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.components.includes("Изобретатель")}
            label={"Изобретатель"}
            value={"Изобретатель"}
            onChange={formik.handleChange}
          />
        </Container>
      </Form.Group>
      <Form.Group controlId="spell-desc">
        <Form.Label>Описание</Form.Label>
        <Form.Control
          as="textarea"
          name="desc"
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="spell-higher-level">
        <Form.Label>Описание для больших уровней</Form.Label>
        <Form.Control
          as="textarea"
          name="higher_level"
          onChange={formik.handleChange}
        />
      </Form.Group>
    </Form>
  );
};

export default SpellForm;