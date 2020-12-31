import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Logo from '../assets/images/logo.svg';
import { Warna } from '../utils/Warna';

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        },1500);
    });

    return (
        <View style={styles.body}>
            <StatusBar hidden />
            <Logo width={'70%'} />
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Warna.primary,
    }
})
