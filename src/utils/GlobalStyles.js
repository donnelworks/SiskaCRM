import { StyleSheet } from 'react-native';
import { Warna } from './Warna';

export const GlobalStyle = StyleSheet.create({
    textError: {
        color: Warna.danger,
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        marginTop: 2,
        marginLeft: 14,
    },
    textAvatar: {
        color: Warna.light,
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
    }
    
})