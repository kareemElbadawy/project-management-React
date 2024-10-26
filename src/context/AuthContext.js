import React, { createContext, useState } from 'react';
import ApiService from '../services/ApiService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const userData = await ApiService.login(credentials);
    setUser(userData);
    return userData; // Return user data for further handling in Login component
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
