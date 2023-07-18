import { format } from 'date-fns';
import React, { createContext, useState } from 'react';

export const detailTripContext = createContext();

const detailTripContext = ({ children }) => {
    const [detailTrip, setDetailTrip] = useState({
        eniqueId: '',
        startPoint: '',
        endPoint: '',
        typeCar: '' || 1,
        departureTime: '' || format(new Date(), 'yyyy-MM-dd HH:mm'),
        note: '',
        isPunish: 0
    });
    const value = {
        detailTrip,
        setDetailTrip,
    };
    return <detailTripContext.Provider value={value}>{children}</detailTripContext.Provider>;
};

export default detailTripContext;
