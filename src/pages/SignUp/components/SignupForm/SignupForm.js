import { Field, Formik } from "formik";
import { Button, Form } from "react-bootstrap";

export default function SignupForm({ cbRegister, isSubmitted }) {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        passwordRepeat: "",
      }}
      onSubmit={(values) => {
        const { email, password, passwordRepeat } = values;

        if (password === passwordRepeat) {
          cbRegister(email, password);
        }
      }}
    >
      {({ handleSubmit, errors, touched, values }) => (
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Form.Group controlId="email">
            <Form.Label>Адрес почты</Form.Label>
            <Field
              as={Form.Control}
              name="email"
              type="email"
              variant="filled"
              isInvalid={!!errors.email && touched.email}
              disabled={isSubmitted}
              validate={(value) => {
                const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
                let error;

                if (!reg.test(value)) {
                  error = "Некорректный адрес почты";
                }

                return error;
              }}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Field
              as={Form.Control}
              name="password"
              type="password"
              variant="filled"
              isInvalid={!!errors.password && touched.password}
              disabled={isSubmitted}
              validate={(value) => {
                let error;

                if (value.length < 6) {
                  error = "Пароль должен быть больше 6 символов";
                }

                return error;
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="passwordRepeat">
            <Form.Label>Повторите пароль</Form.Label>
            <Field
              as={Form.Control}
              name="passwordRepeat"
              type="password"
              variant="filled"
              isInvalid={!!errors.passwordRepeat && touched.passwordRepeat}
              disabled={isSubmitted}
              validate={(value) => {
                let error;

                if (value !== values.password) {
                  error = "Пароли не совпадают";
                }

                return error;
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.passwordRepeat}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={isSubmitted}
          >
            Зарегестрироваться
          </Button>
        </Form>
      )}
    </Formik>
  );
}
