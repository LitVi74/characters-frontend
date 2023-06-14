import { Formik, Field } from "formik";
import { Button, Form } from "react-bootstrap";

export default function LoginForm({cbLogin, isSubmitted}) {
  return (
    <Formik 
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        const { email, password } = values;

        cbLogin(email, password);
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Form.Group controlId="email">
            <Form.Label>Адрес почты</Form.Label>
            <Field
              as={Form.Control}
              name="email"
              type="email"
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
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={isSubmitted}>
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
}