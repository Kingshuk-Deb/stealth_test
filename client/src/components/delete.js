import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import axios from 'axios';
import { AuthState } from '../context/accessToken';

function AlertDialogMovie({ id, handleDelete }) {
  const { accessToken } = AuthState();

  const [isLoading, setIsLodaing] = useState(false);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const cancelRef = useRef();
  
  const toast = useToast();

  async function handleClick() {
    const headersList = {
      Accept: '*/*',
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    const bodyContent = JSON.stringify({
      movieId: id
    });

    const reqOptions = {
      url: 'http://localhost:8080/movie',
      method: 'DELETE',
      headers: headersList,
      data: bodyContent
    };

    try {
      const response = await axios.request(reqOptions);
      if (response.data.success) {
        handleDelete(response.data.movie.id);
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
      <Button colorScheme="red" onClick={onOpen}>
        <DeleteIcon w={3} h={3} />
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Movie
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                colorScheme="red"
                onClick={async () => {
                  setIsLodaing(true);
                  await handleClick();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AlertDialogMovie;
