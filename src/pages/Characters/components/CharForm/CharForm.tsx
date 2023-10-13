import { Form } from "react-bootstrap";
import { useFormik } from "formik";

import { CharData, ICharacter } from "../../../../constants/IConstants"; 

interface PropsCharForm {
  cbSubmit: (charId: string | undefined, char: CharData) => Promise<void>;
  char: Partial<ICharacter>;
}

export default function CharForm({ cbSubmit, char }: PropsCharForm) {
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
