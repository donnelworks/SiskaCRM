import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Logo from '../assets/images/logo.svg';
import { Warna } from '../utils/Warna';
import axios from 'axios';
import { Url } from '../utils/Url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
    useEffect(() => {
        getSession();
    }, [])

    const getSession = async () => {
        try {
            const data = await AsyncStorage.getItem('user');
            const user = JSON.parse(data);
            if (data) {
                loadData(user.username, user.pass);
            } else {
                navigation.replace('Login');
            }
        } catch(err) {
        }
    }
    
    const loadData = (username, pass) => {
        const data = {
            username,
            pass,
        }
        axios.post(Url.api + '/login/cek_login', data)
        .then(res => {
            navigation.replace('Home');
        })
        .catch(err => {
            navigation.replace('Login');
        });
    }

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
