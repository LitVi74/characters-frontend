import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";

export default function SpellForm({ cbSubmit, spell, update }) {
  const castingTime = spell?.casting_time?.split(", ");

  const formik = useFormik({
    initialValues: {
      name: spell?.name ?? "",
      level: spell?.level ?? 0,
      school: spell?.school ?? "",
      castingTime: castingTime?.[0] ?? "",
      castingTimeAdditional:
        castingTime?.slice(1, castingTime?.length)?.join(", ") ?? "",
      range: spell?.range ?? -1,
      components: spell?.components ?? [],
      material: spell?.material ?? "",
      ritual: spell?.ritual ?? false,
      concentration: spell?.concentration ?? false,
      duration: spell?.duration ?? "",
      classes: spell?.classes ?? [],
      desc: spell?.desc ?? "",
      higherLevel: spell?.higher_level ?? "",
    },
    onSubmit: (values) => {
      const data = {
        name: values.name.trim(),
        level: +values.level,
        school: values.school,
        casting_time: [values.castingTime, values.castingTimeAdditional].join(
          ", "
        ),
        range: +values.range,
        components: values.components,
        material: values.material.trim(),
        ritual: values.ritual,
        concentration: values.concentration,
        duration: values.duration.trim(),
        classes: values.classes,
        desc: values.desc.trim(),
        higher_level: values.higherLevel.trim(),
      };

      cbSubmit(data, spell._id, update);
    },
  });

  return (
    <Form
      id={`spell-${spell ? spell._id : "add"}-form`}
      onSubmit={formik.handleSubmit}
    >
      <Form.Group controlId="spell-name">
        <Form.Label>Название</Form.Label>
        <Form.Control
          name="name"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.initialValues.name}
        />
      </Form.Group>
      <Form.Group controlId="spell-level">
        <Form.Label>Уровень</Form.Label>
        <Form.Select
          name="level"
          onChange={formik.handleChange}
          defaultValue={formik.initialValues.level}
        >
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
        <Form.Select
          name="school"
          onChange={formik.handleChange}
          defaultValue={formik.initialValues.school}
        >
          <option hidden value="">
            {" "}
          </option>
          <option value="Вызов">Вызов</option>
          <option value="Воплощение">Воплощение</option>
          <option value="Иллюзия">Иллюзия</option>
          <option value="Некромантия">Некромантия</option>
          <option value="Ограждение">Ограждение</option>
          <option value="Очарование">Очарование</option>
          <option value="Преобразование">Преобразование</option>
          <option value="Прорицание">Прорицание</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="spell-cast-time">
        <Form.Label>Время накладывания</Form.Label>
        <Form.Select
          name="castingTime"
          onChange={formik.handleChange}
          defaultValue={formik.initialValues.castingTime}
        >
          <option hidden value="">
            {" "}
          </option>
          <option value="1 бонусное действие">1 бонусное действие</option>
          <option value="1 реакция">1 реакция</option>
          <option value="1 действие">1 действие</option>
          <option value="1 ход">1 ход</option>
          <option value="1 минута">1 минута</option>
          <option value="10 минут">10 минут</option>
          <option value="1 час">1 час</option>
          <option value="8 часов">8 часов</option>
          <option value="12 часов">12 часов</option>
          <option value="24 часа">24 часа</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="spell-cast-time-additional-condition">
        <Form.Label>Дополнительное условие накладывания заклинания</Form.Label>
        <Form.Control
          as="textarea"
          name="castingTimeAdditional"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.initialValues.castingTimeAdditional}
          placeholder="Например: при получении урона кислотой, холодом, огнем, электричеством или звуком"
        />
      </Form.Group>
      <Form.Group controlId="spell-range">
        <Form.Label>Дистанция</Form.Label>
        <Form.Select
          name="range"
          onChange={formik.handleChange}
          defaultValue={formik.initialValues.range}
        >
          <option value={-3}>В пределах видимости</option>
          <option value={-2}>Особая</option>
          <option value={-1}>На себя</option>
          <option value={0}>Касание</option>
          <option value={5}>5 футов</option>
          <option value={10}>10 футов</option>
          <option value={25}>25 футов</option>
          <option value={30}>30 футов</option>
          <option value={40}>40 футов</option>
          <option value={50}>50 футов</option>
          <option value={60}>60 футов</option>
          <option value={90}>90 футов</option>
          <option value={100}>100 футов</option>
          <option value={120}>120 футов</option>
          <option value={150}>150 футов</option>
          <option value={300}>300 футов</option>
          <option value={400}>400 футов</option>
          <option value={500}>500 футов</option>
          <option value={1000}>1000 футов</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
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
            name="components"
            defaultChecked={formik.initialValues.components.includes("С")}
            label={"С"}
            value={"С"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="components"
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
          defaultValue={formik.initialValues.material}
        />
      </Form.Group>
      <Form.Check
        type="switch"
        name="ritual"
        label="Ритуал"
        onChange={formik.handleChange}
        defaultChecked={formik.initialValues.ritual}
      />
      <Form.Check
        type="switch"
        name="concentration"
        label="Концентрация"
        onChange={formik.handleChange}
        defaultChecked={formik.initialValues.concentration}
      />
      <Form.Group controlId="spell-duration">
        <Form.Label>Длительность</Form.Label>
        <Form.Control
          name="duration"
          onChange={formik.handleChange}
          defaultValue={formik.initialValues.duration}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Классы</Form.Label>
        <Container className="d-flex m-0 p-0 gap-2 flex-wrap">
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.classes.includes("Бард")}
            label={"Бард"}
            value={"Бард"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.classes.includes("Волшебник")}
            label={"Волшебник"}
            value={"Волшебник"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.classes.includes("Друид")}
            label={"Друид"}
            value={"Друид"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.classes.includes("Жрец")}
            label={"Жрец"}
            value={"Жрец"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.classes.includes("Колдун")}
            label={"Колдун"}
            value={"Колдун"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.classes.includes("Паладин")}
            label={"Паладин"}
            value={"Паладин"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.classes.includes("Следопыт")}
            label={"Следопыт"}
            value={"Следопыт"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.classes.includes("Чародей")}
            label={"Чародей"}
            value={"Чародей"}
            onChange={formik.handleChange}
          />
          <Form.Check
            name="classes"
            defaultChecked={formik.initialValues.classes.includes("Изобретатель")}
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
          defaultValue={formik.initialValues.desc}
        />
      </Form.Group>
      <Form.Group controlId="spell-higher-level">
        <Form.Label>Описание для больших уровней</Form.Label>
        <Form.Control
          as="textarea"
          name="higherLevel"
          onChange={formik.handleChange}
          defaultValue={formik.initialValues.higherLevel}
        />
      </Form.Group>
    </Form>
  );
}
