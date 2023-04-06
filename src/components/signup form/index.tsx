import {Field, Formik} from 'formik';
import React, { FC } from 'react';
import {Button, FormControl, FormErrorMessage, FormLabel, Input, VStack} from "@chakra-ui/react";

const SignupForm: FC = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        passwordRepeat: "",
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({handleSubmit, errors, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl isInvalid={!!errors.email && touched.email}>
              <FormLabel htmlFor="email">Адрес почты</FormLabel>
              <Field
                as={Input}
                id="email"
                name="email"
                type="email"
                variant="filled"
                validate={(value: string) => {
                  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
                  let error;

                  if (!reg.test(value)) {
                    error = "Некорректный адрес почты";
                  }

                  return error;
                }}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password && touched.password}>
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <Field
                as={Input}
                id="password"
                name="password"
                type="password"
                variant="filled"
                validate={(value: string) => {
                  let error;

                  if (value.length < 6) {
                    error = "Пароль должен быть больше 6 символов";
                  }

                  return error;
                }}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.passwordRepeat && touched.password}>
              <FormLabel htmlFor="password">Повторите пароль</FormLabel>
              <Field
                as={Input}
                id="passwordRepeat"
                name="passwordRepeat"
                type="password"
                variant="filled"
                validate={(value: string) => {
                  let error;

                  if (value !== values.password) {
                    error = "Пароли не совпадают";
                  }

                  return error;
                }}
              />
              <FormErrorMessage>{errors.passwordRepeat}</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme='blue' width="full">
              Войти
            </Button>
          </VStack>
        </form>
      )}
    </Formik>
  );
};

export default SignupForm;