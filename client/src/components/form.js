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

import axios from 'axios';
import { useToast } from '@chakra-ui/react';

function FormikExample({ isFor }) {
  const [show, setShow] = useState(false);
  
  const toast = useToast();
  
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

  async function signInUser({ email, password }) {
    const headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json; charset=utf-8'
    };

    const bodyContent = JSON.stringify({
      email: email,
      password: password
    });

    const reqOptions = {
      url: 'http://localhost:8080/user/login',
      method: 'POST',
      headers: headersList,
      data: bodyContent
    };
    try {
      const response = await axios.request(reqOptions);
      if (response.data.success) {
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        window.location.replace('/');
      }
    } catch (err) {
      const error = err.response.data.error || err.message;
      toast({
        title: error,
        status: 'error',
        isClosable: true,
        position: 'bottom-right'
      });
    }
  }

  async function signUpUser({ email, password }) {
    const headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json; charset=utf-8'
    };

    const bodyContent = JSON.stringify({
      email: email,
      password: password
    });

    const reqOptions = {
      url: 'http://localhost:8080/user/register',
      method: 'POST',
      headers: headersList,
      data: bodyContent
    };
    try {
      const response = await axios.request(reqOptions);
      if (response.data.success) {
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        window.location.replace('/');
      }
    } catch (err) {
      const error = err.response.data.error || err.message;
      toast({
        title: error,
        status: 'error',
        isClosable: true,
        position: 'bottom-right'
      });
    }
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, actions) => {
        if (isFor === 'signin') {
          await signInUser(values);
        } else if (isFor === 'signup') {
          await signUpUser(values);
        }
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Field name="email" validate={validateEmail}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel paddingBottom={2}>Email</FormLabel>
                <Input {...field} placeholder="name@mail.com" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
                    {...field}
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
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
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
