// The below import defines which components come from formik
import { Field, Form, Formik } from 'formik';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { useState } from 'react';

function FormikExample() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Email is required';
    }
    return error;
  }

  function validatePassword(value) {
    let error = '';
    if (!value) {
      error = 'Password is required';
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ email: 'name@mail.com' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form>
          <Field name="email" validate={validateEmail}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel paddingBottom={2}>Email</FormLabel>
                <Input {...field} placeholder="name@mail.com" />
                {form.errors.email ? (
                  form.errors.email.split(',').map((error, i) => (
                    <FormErrorMessage key={i} fontSize={'xs'}>
                      {error}
                    </FormErrorMessage>
                  ))
                ) : (
                  <FormErrorMessage fontSize={'xs'}>
                    {form.errors.email}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          </Field>
          <Field name="password" validate={validatePassword}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel paddingTop={6} paddingBottom={2}>
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {form.errors.password ? (
                  form.errors.password.split(',').map((error, i) => (
                    <FormErrorMessage key={i} fontSize={'xs'}>
                      {error}
                    </FormErrorMessage>
                  ))
                ) : (
                  <FormErrorMessage fontSize={'xs'}>
                    {form.errors.password}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          </Field>
          <Button
            marginTop={6}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikExample;
