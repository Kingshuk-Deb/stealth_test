import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Signup from './pages/signup';
import SignIn from './pages/signin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthState } from './context/accessToken';

function App() {
  const { setAccessToken } = AuthState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function checkLoginState() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      setIsLoggedIn(false);
      return;
    }
    try {
      const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/json'
      };

      const bodyContent = JSON.stringify({
        refreshToken: `${refreshToken}`
      });

      const reqOptions = {
        url: 'http://localhost:8080/user/access-token',
        method: 'POST',
        headers: headersList,
        data: bodyContent
      };

      const response = await axios.request(reqOptions);
      if (response.data.success) {
        // localStorage.setItem('accessToken', response.data.accessToken);
        setAccessToken(response.data.accessToken);
        setIsLoggedIn(true);
      }
      console.log(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        console.log(err.response.data);
        localStorage.clear();
        setIsLoggedIn(false);
      }
      console.log(err.response.status);
    }
  }

  useEffect(() => {
    checkLoginState();
    // eslint-disable-next-line
  }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Signup />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
