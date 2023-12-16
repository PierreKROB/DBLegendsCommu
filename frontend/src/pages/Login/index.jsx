import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button
} from '@chakra-ui/react'

import { Field, Form, Formik } from 'formik';
import FormErrorMessage from '../../components/CustomFormErrorMessage';

const VARIANT_COLOR = 'teal'

const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Le pseudo est obligatoire';
    }
    if (!values.password) {
      errors.password = 'Le mot de passe est obligatoire';
    }
    return errors;
  };


const Login = () => {
  return (
        <LoginArea />
  )
}



// Update the LoginArea component to be responsive
const LoginArea = () => {
    return (
      <Flex minHeight={{ base: 'auto', md: '80vh' }} width='full' align='center' justifyContent='center'>
        <Box 
          borderWidth={1}
          px={4}
          width='full'
          maxWidth='500px'
          borderRadius={4}
          textAlign='center'
          boxShadow='lg'
        >
          <Box p={4}>
            <LoginHeader />
            <LoginForm />
          </Box>
        </Box>
      </Flex>
    );
  };
  


const LoginHeader = () => {
  return (
    <Box textAlign='center'>
      <Heading>Connexion</Heading>
    </Box>
  )
}


const LoginForm = () => {

    return (
      <Box my={8} textAlign='left'>
        <Formik
          initialValues={{ username: '', password: '', remember: false }}
          validate={validate}
          onSubmit={(values) => {
            // Handle form submission logic here
            console.log(values);
          }}
        >
          <Form>
            <Field name='username'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <FormLabel>Pseudo</FormLabel>
                  <Input {...field} type='text' placeholder='Pseudo' />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
  
            <Field name='password'>
              {({ field, form }) => (
                <FormControl
                  mt={4}
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel>Mot de passe</FormLabel>
                  <Input {...field} type='password' placeholder='Mot de passe' />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
  
            <Stack isInline justifyContent='space-between' mt={4}>
              <Box>
                <Field name='remember'>
                  {({ field }) => (
                    <Checkbox {...field}>Rester Connecté</Checkbox>
                  )}
                </Field>
              </Box>
              <Box>
                <Link color={`${VARIANT_COLOR}.500`}>Mot de passe oublié?</Link>
              </Box>
            </Stack>

            <Button
              variantColor={VARIANT_COLOR}
              width='full'
              mt={4}
              type='submit'
            >
              Connexion
            </Button>
          </Form>
        </Formik>
      </Box>
    );
  };

export default Login