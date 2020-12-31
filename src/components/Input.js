import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Animated } from 'react-native';
import { Warna } from '../utils/Warna';

const Input = ({label, ...props}) => {
    const [focus, setFocus] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0));

    const handleFocus = () => setFocus(true);
    const handleBlur = () => setFocus(false);

    useEffect(() => {
        Animated.timing(animation, {
          toValue: focus || props.value != "" ? 1 : 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
    }, [focus, props.value ]);

    const labelStyle = {
        fontFamily: 'Montserrat-Medium',
        backgroundColor: Warna.light,
        color: focus ? Warna.primary : Warna.softDark,
        paddingHorizontal: 3,
        position: 'absolute',
        left: 14,
        top: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [23, 0],
        }),
        fontSize: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 12],
        }),
        zIndex: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
    }

    const inputStyle = {
        borderWidth: focus ? 2 : 1,
        borderRadius: 8,
        borderColor: focus ? Warna.primary : Warna.softDark,
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        paddingHorizontal: 14,
        height: 48,
        color: Warna.dark,
        position: 'relative',
    }

    return (
        <View style={styles.container}>
            <Animated.Text style={labelStyle}>{label}</Animated.Text>
            <TextInput style={inputStyle} {...props} onFocus={handleFocus} onBlur={handleBlur} />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
});
