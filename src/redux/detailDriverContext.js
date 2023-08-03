import React, { createContext, useState } from 'react';

export const DetailDriverContext = createContext();
const DetailDriverProvider = ({ children }) => {
  const [detailDriver, setDetailDriver] = useState({
    eniqueId: '',
  });
  const value = {
    detailDriver,
    setDetailDriver,
  };
  return <DetailDriverContext.Provider value={value}>{children}</DetailDriverContext.Provider>;
};
export default DetailDriverProvider