import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import FormikExample from '../components/form';

const Signup = () => {
  return (
    <Flex
      height={'100vh'}
      alignItems={'center'}
      justifyContent={'center'}
      background={'gray.700'}
    >
      <Flex
        direction={'column'}
        background={'gray.100'}
        p={6}
        rounded={6}
        height={420}
        width={350}
      >
        <Heading paddingBottom={6}>Sign Up</Heading>
        <FormikExample isFor={'signup'} />
        <Flex direction={'row'} pt={2}>
          <Text fontSize={'small'} pr={1}>
            Already have an account?
          </Text>
          <Text color={'gray.700'} fontWeight={'bold'} fontSize={'small'}>
            <Link
              to="/login"
              color={'gray.700'}
              fontWeight={'bold'}
              fontSize={'small'}
            >
              Sign In
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Signup;
