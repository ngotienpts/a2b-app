import React, { createContext, useState } from 'react';

export const PassengerContext = createContext();
const PassengerProvider = ({ children }) => {
  const [passenger, setPassenger] = useState({});
  const value = {
    passenger,
    setPassenger,
  };
  return <PassengerContext.Provider value={value}>{children}</PassengerContext.Provider>;
};
export default PassengerProvider