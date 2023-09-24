import { Form } from "react-bootstrap";
import { useFormik } from "formik";

export default function CharForm({ cbSubmit, char }) {
  const formik = useFormik({
    initialValues: {
      name: char?.name ?? "",
    },
    onSubmit: (values) => {
      cbSubmit(char?._id, values);
    },
  });

  return (
    <Form id={`character-${char ? char._id : "add"}-form`} onSubmit={formik.handleSubmit}>
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
