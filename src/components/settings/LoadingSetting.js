import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import styles from '../../styles';
import Skenleton from '../skeleton/Skenleton';
import { Dimensions } from 'react-native';

const LoadingSetting = () => {
    const cardWidth = Dimensions.get("window").width * 0.8;

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#000",
        }}>
            <Skenleton height={142} width={cardWidth + 80} style={{marginTop: 10, backgroundColor: '#0C1116',alignItems: 'flex-end'}} />
            <View style={{
              backgroundColor: "#000",
              alignItems: "center",
            }}>
              <Skenleton height={114} width={cardWidth - 217} 
                style={{
                  marginTop: 30, 
                  borderRadius: 100,
                  backgroundColor: '#0C1116'
                }} 
              />
            </View>
            <Skenleton height={50} width={cardWidth + 80} style={{marginTop: 50, backgroundColor: '#0C1116',alignItems: 'flex-start', borderBottomWidth: 2}} />
            <Skenleton height={50} width={cardWidth + 80} style={{backgroundColor: '#0C1116',alignItems: 'flex-start', borderBottomWidth: 2}} />
            <Skenleton height={50} width={cardWidth + 80} style={{backgroundColor: '#0C1116',alignItems: 'flex-start', borderBottomWidth: 2}} />
            <Skenleton height={50} width={cardWidth + 80} style={{marginBottom: 50, backgroundColor: '#0C1116',alignItems: 'flex-start', borderBottomWidth: 2}} />
            <Skenleton height={50} width={cardWidth + 80} style={{backgroundColor: '#0C1116',alignItems: 'flex-start', borderBottomWidth: 2}} />
            <Skenleton height={50} width={cardWidth + 80} style={{backgroundColor: '#0C1116',alignItems: 'flex-start', borderBottomWidth: 2}} />
            <Skenleton height={50} width={cardWidth + 80} style={{marginTop: 50, backgroundColor: '#0C1116',alignItems: 'flex-start', borderBottomWidth: 2}} />
        </View>
    );
};

export default LoadingSetting;
