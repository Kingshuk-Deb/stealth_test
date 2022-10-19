import {
  Button,
  Flex,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import AlertDialogMovie from '../components/delete';
import ModalForMovieEntry from '../components/modal';
import logo from '../logo.png';

const movies = [
  {
    id: 1,
    name: 'The Shawshank Redemption',
    rating: '9.3',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    genre: 'Drama',
    releaseDate: '2nd Dec 1996'
  }
];

const Home = () => {
  return (
    <Flex direction={'column'}>
      <Flex
        zIndex={999}
        width={'100%'}
        height={'8vh'}
        alignSelf={'flex-start'}
        alignItems={'center'}
        justifyContent={'center'}
        background={'gray.800'}
      >
        <Image src={logo} ml={'8vw'} w={'120px'} h={'120px'} />
        <Button
          ml={'auto'}
          mr={'8vw'}
          background={'gray.500'}
          color={'gray.900'}
        >
          <Link to="/login">Sign Out</Link>
        </Button>
      </Flex>
      <Flex
        height={'100vh'}
        alignItems={'center'}
        justifyContent={'center'}
        background={'gray.700'}
      >
        <TableContainer background={'green.300'} rounded={6}>
          <Table variant="simple">
            <TableCaption>
              <ModalForMovieEntry />
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Rating</Th>
                <Th>Cast</Th>
                <Th>Genre</Th>
                <Th>Release Date</Th>
                <Th>Edit?</Th>
                <Th>Delete!</Th>
              </Tr>
            </Thead>
            <Tbody>
              {movies.map((movie) => (
                <>
                  <Tr key={movie.id}>
                    <Td>{movie.name}</Td>
                    <Td>{movie.rating}</Td>
                    <Td>
                      <Flex>
                        {movie.cast.map((name, i) => (
                          <Text
                            key={name}
                            m={2}
                            p={1}
                            background={'gray.300'}
                            rounded={6}
                          >
                            {name}
                          </Text>
                        ))}
                      </Flex>
                    </Td>
                    <Td>{movie.genre}</Td>
                    <Td>{movie.releaseDate}</Td>
                    <Td>
                      <ModalForMovieEntry
                        isFor={'edit'}
                        name={movie.name}
                        rating={movie.rating}
                        cast={movie.cast}
                        genre={movie.genre}
                        date={movie.releaseDate}
                      />
                    </Td>
                    <Td>
                      <AlertDialogMovie />
                    </Td>
                  </Tr>
                </>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};

export default Home;
