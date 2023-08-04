// NotificationContext.js
import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

    const handleHiddenNoti = () => {
        setHasUnreadNotification(false);
    };

    return (
        <NotificationContext.Provider value={{ hasUnreadNotification, handleHiddenNoti }}>
            {children}
        </NotificationContext.Provider>
    );
};
