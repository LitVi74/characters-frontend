import { VStack, FormControl, FormLabel, Input, FormErrorMessage, Button } from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { FC } from "react"

const LoginForm: FC = () => {
  return (
    <Formik 
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ handleSubmit, errors, touched }) => (
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
            <Button type="submit" colorScheme='blue' width="full">
              Войти
            </Button>
          </VStack>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;