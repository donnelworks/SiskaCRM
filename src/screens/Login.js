import React, { useState, useEffect } from 'react';
import { BackHandler, ToastAndroid, ActivityIndicator, ScrollView, Keyboard, SafeAreaView, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Button, Input, Space } from '../components';
import LogoCrm from '../assets/images/logo-crm.svg';
import axios from 'axios';
import { Url } from '../utils/Url';
import { Warna } from '../utils/Warna';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

const Loading = () => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={Warna.light} />
        </View>
    )
}

const Login = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [pressBack, setPressBack] = useState(0);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }
    }, [pressBack])

    const handleBackButton = () => {
        pressBack == 1 ? BackHandler.exitApp() : toastExit();
        return true;
    };

    const toastExit = () => {
        setPressBack(1);
        showToast();
        setTimeout(() => {
            setPressBack(0);
        }, 3000);
    };

    const showToast = () => {
        ToastAndroid.show("Tekan sekali lagi untuk keluar", ToastAndroid.SHORT);
    };

    // const [username, setUsername] = useState("");
    // const [pass, setPass] = useState("");

    // const proses = () => {
    //     setLoading(true);
    //     const data = { username, pass };

    //     axios.post(Url.api + '/login/proses', data)
    //     .then(res => {
    //         setUsername("");
    //         setPass("");
    //         setLoading(false);
    //         navigation.navigate('Home');
    //     })
    //     .catch(err => {
    //         setLoading(false);
    //         if (username == "" || pass == "") {
    //             alert('Data belum lengkap');
    //         } else {
    //             alert('Akun tidak terdaftar');
    //         }
    //     });
    // }

    const submit = (values, actions) => {
        setLoading(true);
        axios.post(Url.api + '/login/proses', values)
        .then(res => {
            setLoading(false);
            actions.resetForm();
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            navigation.navigate('Home');
        })
        .catch(err => {
            setLoading(false);
            alert('User tidak terdaftar');
        });
    }

    const validRules = yup.object({
        username: yup.string().required('Username wajib diisi'),
        pass: yup.string().required('Password wajib diisi')
    })

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
                            initialValues={{username: "", pass: ""}}
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

                        {/* <Input label="Username" value={username} onChangeText={(value) => setUsername(value)} autoFocus={true} autoCapitalize="none" />
                        <Input label="Password" value={pass} onChangeText={(value) => setPass(value)} secureTextEntry={true} autoCapitalize="none" />
                        <Space height={20} />
                        <Button type="primary" onPress={proses}>Masuk</Button> */}
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
