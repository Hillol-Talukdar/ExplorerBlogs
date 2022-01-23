import React from 'react';

export default React.createContext({
  token: '',
  login: (token) => {},
  logout: () => {},
});
