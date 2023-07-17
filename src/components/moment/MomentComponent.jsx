import React from 'react';
import moment from 'moment';
import { Text } from 'react-native';

const MomentComponent = ({ timeString }) => {
    const currentTime = moment();
    const pastTime = moment(timeString);
    const duration = moment.duration(currentTime.diff(pastTime));

    const monthsAgo = duration.asMonths();
    const hoursAgo = duration.asHours();
    const daysAgo = duration.asDays();

    let output;

    switch (true) {
        case monthsAgo >= 1:
            output = `${Math.floor(monthsAgo)} tháng trước`;
            break;
        case daysAgo >= 1:
            output = `${Math.floor(daysAgo)} ngày trước`;
            break;
        case hoursAgo >= 1:
            output = `${Math.floor(hoursAgo)} giờ trước`;
            break;
        default:
            output = 'vừa xong';
    }

    return <Text>{output}</Text>;
};

export default MomentComponent;
