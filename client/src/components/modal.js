import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';

import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import axios from 'axios';
import { AuthState } from '../context/accessToken';

function ModalForMovieEntry({
  isFor,
  id,
  name,
  rating,
  cast,
  genre,
  date,
  handleAddition,
  handleEdit
}) {
  const { accessToken } = AuthState();

  
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [isLodaing, setIsLodaing] = useState(false);
  const [movieName, setMovieName] = useState(name || '');
  const [movierating, setMovierating] = useState(
    parseFloat(rating).toFixed(1) || 7.5
  );
  const [moviecast, setMoviecast] = useState(cast || '');
  const [moviegenre, setMoviegenre] = useState(genre || '');
  const [moviedate, setMoviedate] = useState(date || dateFormat(new Date()));

  const initialRef = useRef(null);
  const finalRef = useRef(null);

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

  async function addNewMovie() {
    const castArray = moviecast.split(',');
    const releaseDate = new Date(moviedate);
    const headersList = {
      Accept: '*/*',
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    const bodyContent = JSON.stringify({
      name: movieName,
      rating: movierating.toString(),
      cast: castArray,
      genre: moviegenre,
      releaseDate: releaseDate
    });

    const reqOptions = {
      url: 'http://localhost:8080/movie',
      method: 'POST',
      headers: headersList,
      data: bodyContent
    };
    try {
      const response = await axios.request(reqOptions);
      if (response.data.success) {
        const newMovie = {
          id: response.data.movie.id,
          name: response.data.movie.name,
          rating: response.data.movie.rating,
          cast: response.data.movie.cast,
          genre: response.data.movie.genre,
          releaseDate: dateFormat(new Date(response.data.movie.releaseDate))
        };
        handleAddition(newMovie);
        setIsLodaing(false);
        onClose();
      }
    } catch (err) {
      const error = err.response.data.error || err.message;
      toast({
        title: error,
        status: 'error',
        isClosable: true,
        position: 'bottom-right'
      });
      setIsLodaing(false);
    }
  }

  async function editMovie() {
    const castArray = Array.isArray(moviecast)
      ? moviecast
      : moviecast.split(',');
    const releaseDate = new Date(moviedate);
    const headersList = {
      Accept: '*/*',
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    const bodyContent = JSON.stringify({
      movieId: id,
      name: movieName,
      rating: movierating.toString(),
      cast: castArray,
      genre: moviegenre,
      releaseDate: releaseDate
    });

    const reqOptions = {
      url: 'http://localhost:8080/movie',
      method: 'PATCH',
      headers: headersList,
      data: bodyContent
    };
    try {
      const response = await axios.request(reqOptions);
      if (response.data.success) {
        const newMovie = {
          id: response.data.movie.id,
          name: response.data.movie.name,
          rating: response.data.movie.rating,
          cast: response.data.movie.cast,
          genre: response.data.movie.genre,
          releaseDate: dateFormat(new Date(response.data.movie.releaseDate))
        };
        handleEdit(newMovie);
        setIsLodaing(false);
        onClose();
      }
    } catch (err) {
      const error = err.response.data.error || err.message;
      toast({
        title: error,
        status: 'error',
        isClosable: true,
        position: 'bottom-right'
      });
      setIsLodaing(false);
    }
  }

  return (
    <>
      <Flex>
        <Button
          background={isFor && isFor === 'edit' ? 'blue.500' : 'gray.100'}
          color={isFor && isFor === 'edit' ? 'gray.900' : 'green.700'}
          onClick={onOpen}
          ref={finalRef}
        >
          {isFor && isFor === 'edit' ? (
            <EditIcon w={3} h={3} />
          ) : (
            <Text>
              Add a movie <AddIcon ml={2} w={3} h={3} />
            </Text>
          )}
        </Button>
      </Flex>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Movie name</FormLabel>
              <Input
                value={movieName || ''}
                ref={initialRef}
                placeholder="Movie name"
                onChange={(e) => {
                  setMovieName(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Rating</FormLabel>
              <NumberInput
                defaultValue={movierating || 7.5}
                precision={1}
                step={0.1}
                min={0.0}
                max={10.0}
                onChange={(e) => {
                  setMovierating(e);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Cast</FormLabel>
              <Input
                value={moviecast || ''}
                placeholder="Cast"
                onChange={(e) => {
                  setMoviecast(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Genre</FormLabel>
              <Input
                value={moviegenre || ''}
                placeholder="Genre"
                onChange={(e) => {
                  setMoviegenre(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Release Date</FormLabel>
              <Input
                value={moviedate || ''}
                placeholder="Release Date"
                type="date"
                onChange={(e) => {
                  setMoviedate(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              colorScheme="teal"
              isLoading={isLodaing}
              type="submit"
              onClick={async () => {
                setIsLodaing(true);
                if (isFor === 'edit') {
                  editMovie();
                } else {
                  addNewMovie();
                }
              }}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalForMovieEntry;
