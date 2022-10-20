import { createContext, useContext, useState } from 'react';

const Auth = createContext();

const Context = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');

  return (
    <Auth.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </Auth.Provider>
  );
};

export const AuthState = () => {
  return useContext(Auth);
};

export default Context;
