import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Warna } from '../utils/Warna';

const Button = ({type, children, ...props}) => {
    
    if (type === "primary") {
        return (
            <Ripple rippleColor="#fff" {...props}>
                <View style={styles.primary}>
                    <Text style={styles.titleLight}>{children}</Text>
                </View>
            </Ripple>
        ) 
    } else if (type === "secondary") {
        return (
            <Ripple rippleColor="#fff" {...props}>
                <View style={styles.secondary}>
                    <Text style={styles.titlePrimary}>{children}</Text>
                </View>
            </Ripple>
        ) 
    } else if (type === "disabled") {
        return (
            <Ripple rippleColor="#fff" {...props}>
                <View style={styles.disabled}>
                    <Text style={styles.titleLight}>{children}</Text>
                </View>
            </Ripple>
        ) 
    } else {
        return (
            <Ripple rippleColor="#aaa"leWithoutFeedback {...props}>
                <View style={styles.none}>
                    <Text style={styles.titlePrimary}>{children}</Text>
                </View>
            </Ripple>
        ) 
    }
}

export default Button;

const styles = StyleSheet.create({
    primary: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: Warna.primary,
    },
    secondary: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: Warna.softPrimary,
    },
    disabled: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: Warna.softDark,
    },
    none: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    titleLight: {
        fontFamily: 'Montserrat-SemiBold',
        color: Warna.light,
    },
    titlePrimary: {
        fontFamily: 'Montserrat-SemiBold',
        color: Warna.primary,
    }
})
