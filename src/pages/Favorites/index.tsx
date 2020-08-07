import React from 'react';
import { View,Text } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';

function Favorits(){
    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys Favoritos" />
        </View>
    )
    
}

export default Favorits;