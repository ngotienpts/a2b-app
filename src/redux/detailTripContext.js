import { createContext, useState } from "react";

export const DetailTripContext = createContext();

const DetailTripProvider = ({ children }) => {
    const [detailTrip, setDetailTrip] = useState({
        duration: '',
        distance: ''
    });
    const value = {
        detailTrip,
        setDetailTrip,
    };
    return <DetailTripContext.Provider value={value}>{children}</DetailTripContext.Provider>;
};

export default DetailTripProvider;
