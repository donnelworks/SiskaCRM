import React, {useState, useEffect} from 'react';
import { TextInput, View, Animated, Text, TouchableWithoutFeedback } from 'react-native';
import { Warna } from '../utils/Warna';
import { GlobalStyle } from '../utils/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = ({label, error, touch, ...props}) => {
    const [focus, setFocus] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0));

    const handleFocus = () => setFocus(true);
    const handleBlur = () => setFocus(false);

    useEffect(() => {
        Animated.timing(animation, {
          toValue: focus || props.value != "" ? 1 : 0,
          duration: 150,
          useNativeDriver: false,
        }).start();
    }, [focus, props.value ]);

    const labelStyle = {
        fontFamily: 'Montserrat-Medium',
        backgroundColor: Warna.light,
        color: focus ? Warna.primary : error && touch ? Warna.danger : Warna.softDark,
        paddingHorizontal: 3,
        position: 'absolute',
        left: 14,
        top: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [13, -8],
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

    const resetStyle = {
        color: focus ? Warna.primary : error && touch ? Warna.danger : Warna.softDark,
        paddingHorizontal: 3,
        position: 'absolute',
        right: 14,
        top: 13,
        zIndex: 1,
    }

    const inputStyle = {
        borderWidth: focus ? 2 : 1,
        borderRadius: 8,
        borderColor: focus ? Warna.primary : error && touch ? Warna.danger : Warna.softDark,
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        paddingLeft: 14,
        paddingRight: 50,
        height: 48,
        color: Warna.dark,
        position: 'relative',
    }
    
    return (
        <View>
            <Animated.Text style={labelStyle}>{label}</Animated.Text>
            <TextInput style={inputStyle} {...props} onFocus={handleFocus} onBlur={handleBlur} />
            {/* {props.value != "" && (
                <TouchableWithoutFeedback>
                    <Icon name="close-circle" size={20} style={resetStyle} />
                </TouchableWithoutFeedback>
            )} */}
            {touch && error ? <Text style={GlobalStyle.textError}>{error}</Text> : null}
        </View>
    )
}

export default Input;

