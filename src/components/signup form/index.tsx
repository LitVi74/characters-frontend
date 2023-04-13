import {Field, Formik} from 'formik';
import React, { FC } from 'react';
import {Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignupForm: FC = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        passwordRepeat: "",
      }}
      onSubmit={(values) => {
        navigate("/characters");
      }}
    >
      {({handleSubmit, errors, touched, values }) => (
        <Form onSubmit={handleSubmit} className="w-100 d-flex flex-column gap-3">
          <Form.Group controlId="email">
            <Form.Label>Адрес почты</Form.Label>
            <Field
              as={Form.Control}
              id="email"
              name="email"
              type="email"
              variant="filled"
              isInvalid={!!errors.email && touched.email}
              validate={(value: string) => {
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
          <Form.Group  controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Field
              as={Form.Control}
              id="password"
              name="password"
              type="password"
              variant="filled"
              isInvalid={!!errors.password && touched.password}
              validate={(value: string) => {
                let error;

                if (value.length < 6) {
                  error = "Пароль должен быть больше 6 символов";
                }

                return error;
              }}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="passwordRepeat">
            <Form.Label>Повторите пароль</Form.Label>
            <Field
              as={Form.Control}
              id="passwordRepeat"
              name="passwordRepeat"
              type="password"
              variant="filled"
              isInvalid={!!errors.passwordRepeat && touched.passwordRepeat}
              validate={(value: string) => {
                let error;

                if (value !== values.password) {
                  error = "Пароли не совпадают";
                }

                return error;
              }}
            />
            <Form.Control.Feedback type="invalid">{errors.passwordRepeat}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;