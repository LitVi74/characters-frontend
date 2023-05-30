import { Form } from "react-bootstrap";
import { useFormik } from "formik";

export default function CharForm({ cbSubmit, char, update }) {
  const formik = useFormik({
    initialValues: {
      _id: char?._id ?? "",
      name: char?.name ?? "",
    },
    onSubmit: (values) => {
      cbSubmit(values, update);
    },
  });

  return (
    <Form
      id={`spell-${char ? char._id : "add"}-form`}
      onSubmit={formik.handleSubmit}
    >
      <Form.Group controlId="char-name">
        <Form.Label>Название</Form.Label>
        <Form.Control
          name="name"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.initialValues.name}
        />
      </Form.Group>
    </Form>
  );
}
