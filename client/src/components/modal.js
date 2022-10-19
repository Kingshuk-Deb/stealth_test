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
  useDisclosure
} from '@chakra-ui/react';

import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';

function ModalForMovieEntry({ isFor, name, rating, cast, genre, date }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLodaing, setIsLodaing] = useState(false);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

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
                value={name || ''}
                ref={initialRef}
                placeholder="Movie name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Rating</FormLabel>
              <NumberInput
                defaultValue={rating || 7.5}
                precision={1}
                step={0.1}
                min={0.0}
                max={10.0}
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
              <Input value={cast || ''} placeholder="Cast" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Genre</FormLabel>
              <Input value={genre || ''} placeholder="Genre" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Release Date</FormLabel>
              <Input
                value={date || ''}
                placeholder="Release Date"
                type="date"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              colorScheme="teal"
              isLoading={isLodaing}
              type="submit"
              onClick={() => {
                setIsLodaing(true);
                // Validate input functions
                setTimeout(() => {
                  setIsLodaing(false);
                  onClose();
                }, 1000);
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
