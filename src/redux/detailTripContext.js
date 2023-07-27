import { format } from 'date-fns';
import React, { createContext, useState } from 'react';

export const detailTripContext = createContext();

const detailTripProvider = ({ children }) => {
    const [detailTrip, setDetailTrip] = useState({
        eniqueId: '',
        distance: '' || 0,
        duration: '' || 0,
    });
    const value = {
        detailTrip,
        setDetailTrip,
    };
    return <detailTripContext.Provider value={value}>{children}</detailTripContext.Provider>;
};

export default detailTripProvider;
