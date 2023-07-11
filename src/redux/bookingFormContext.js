import React, { createContext, useState } from 'react';

export const BookingFormContext = createContext();

const BookingFormProvider = ({ children }) => {
    const [bookingForm, setBookingForm] = useState({
        eniqueId: '',
        startPoint: '',
        endPoint: '',
        typeCar: '',
        departureTime: '',
        note: '',
    });
    const value = {
        bookingForm,
        setBookingForm,
    };
    return <BookingFormContext.Provider value={value}>{children}</BookingFormContext.Provider>;
};

export default BookingFormProvider;
