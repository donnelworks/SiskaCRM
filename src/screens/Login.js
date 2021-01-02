import React, { useState, useEffect } from 'react';
import { ToastAndroid, ActivityIndicator, ScrollView, Keyboard, SafeAreaView, StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import { Button, Input, Space } from '../components';
import LogoCrm from '../assets/images/logo-crm.svg';
import axios from 'axios';
import { Url } from '../utils/Url';
import { Warna } from '../utils/Warna';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Loading = () => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={Warna.light} />
        </View>
    )
}

const Login = ({navigation}) => {
    const [loading, setLoading] = useState(false);

    // Submit action
    const submit = (values, actions) => {
        setLoading(true);
        axios.post(Url.api + '/login/proses', values)
        .then(res => {
            setLoading(false);
            setSession(res.data.data);
            actions.resetForm();
            navigation.replace('Home');
        })
        .catch(err => {
            setLoading(false);
            alert('Maaf, user tidak terdaftar');
        });
    }

    // Set user session
    const setSession = async (value) => {
        try {
            const obj = JSON.stringify(value);
            await AsyncStorage.setItem('user', obj);
        } catch(e) {
        }
    }

    // Set Rules validation
    const validRules = yup.object({
        username: yup.string().required('Username wajib diisi'),
        pass: yup.string().required('Password wajib diisi')
    });

    // Name values
    const initialValues = {
        username: "",
        pass: "",
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <LogoCrm width={'80%'} />
                    </View>
                    <View style={styles.body}>

                        {/* Form */}
                        <Formik 
                            initialValues={initialValues}
                            validationSchema={validRules}
                            onSubmit={(values, actions) => submit(values, actions)}>
                            {(props) => (
                                <View>
                                    <Input 
                                    label="Username" 
                                    value={props.values.username} 
                                    onChangeText={props.handleChange('username')} 
                                    autoFocus={true} 
                                    autoCapitalize="none"
                                    error={props.errors.username}
                                    touch={props.touched.username}
                                    />

                                    <Space height={15} />

                                    <Input 
                                    label="Password" 
                                    value={props.values.pass} 
                                    onChangeText={props.handleChange('pass')} 
                                    secureTextEntry={true} 
                                    autoCapitalize="none" 
                                    error={props.errors.pass}
                                    touch={props.touched.pass}
                                    />

                                    <Space height={20} />
                                    <Button type="primary" onPress={() => props.handleSubmit()}>Masuk</Button>
                                </View>
                            )}
                        </Formik>

                    </View>
                    <View style={styles.footer}>
                        <Space height={10} />
                        <Button>Lupa password?</Button>
                    </View>
                </ScrollView>
                {loading == true && ( <Loading /> )} 
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Warna.light,
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    body: {
        paddingHorizontal: 20,
    },
    loading: {
        width: '100%',
        height: '100%', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(85, 110, 230, 0.9)', 
        position: 'absolute'
    },
    footer: {
        paddingHorizontal: 20,
    },
})
