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
  Tr,
  useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AlertDialogMovie from '../components/delete';
import ModalForMovieEntry from '../components/modal';
import logo from '../logo.png';
import axios from 'axios';
import { AuthState } from '../context/accessToken';

const Home = () => {
  const { accessToken } = AuthState();
  
  const toast = useToast();
  
  const [movies, setMovies] = useState([]);

  function dateFormat(date) {
    let monthString = '',
      dayString = '';
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (month < 10) {
      monthString = `0${month}`;
    } else {
      monthString = `${month}`;
    }
    if (day < 10) {
      dayString = `0${day}`;
    } else {
      dayString = `${day}`;
    }
    return `${year}-${monthString}-${dayString}`;
  }

  async function fetchMovies() {
    const headersList = {
      Accept: '*/*',
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    const reqOptions = {
      url: 'http://localhost:8080/user',
      method: 'GET',
      headers: headersList
    };

    try {
      const response = await axios.request(reqOptions);
      if (response.data.success) {
        const allMovies = response.data.user.movies.map((movie) => {
          return {
            id: movie.id,
            name: movie.name,
            rating: movie.rating,
            cast: movie.cast,
            genre: movie.genre,
            releaseDate: dateFormat(new Date(movie.releaseDate))
          };
        });
        setMovies(allMovies);
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
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace('/login');
  };

  const handleAddition = (data) => {
    setMovies([...movies, data]);
  };

  const handleEdit = (data) => {
    setMovies(
      movies.map((movie) => {
        if (movie.id === data.id) {
          return data;
        } else {
          return movie;
        }
      })
    );
  };

  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

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
          onClick={handleLogout}
        >
          Sign Out
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
              <ModalForMovieEntry handleAddition={handleAddition} />
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
                        id={movie.id}
                        rating={movie.rating}
                        cast={movie.cast}
                        genre={movie.genre}
                        date={movie.releaseDate}
                        handleEdit={handleEdit}
                      />
                    </Td>
                    <Td>
                      <AlertDialogMovie
                        id={movie.id}
                        handleDelete={handleDelete}
                      />
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
