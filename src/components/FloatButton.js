import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Warna } from '../utils/Warna'
import Ripple from 'react-native-material-ripple';

const FloatButton = ({title, ...props}) => {
    return (
        <Ripple rippleColor="#fff" {...props} style={styles.floatButton}>
            {props.children}
        </Ripple>
    )
}

export default FloatButton

const styles = StyleSheet.create({
    floatButton: {
        width: 60,
        height: 60,
        backgroundColor: Warna.primary,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    text: {
        color: Warna.light,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 24,
    }
})
