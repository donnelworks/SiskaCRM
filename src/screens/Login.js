import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Keyboard, SafeAreaView, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Button, Input, Space } from '../components';
import LogoCrm from '../assets/images/logo-crm.svg';
import axios from 'axios';
import { Url } from '../utils/Url';
import { Warna } from '../utils/Warna';
import { Formik } from 'formik';

const Login = ({navigation}) => {
    const [loading, setLoading] = useState(false);
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
            navigation.navigate('Home');
        })
        .catch(err => {
            setLoading(false);
            if (values.username == "" || values.pass == "") {
                alert('Data belum lengkap');
            } else {
                alert('Akun tidak terdaftar');
            }
        });
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
                            initialValues={{username: "", pass: ""}}
                            onSubmit={(values, actions) => submit(values, actions)}>
                            {(props) => (
                                <View>
                                    <Input label="Username" value={props.values.username} onChangeText={props.handleChange('username')} autoFocus={true} autoCapitalize="none" />
                                    <Input label="Password" value={props.values.pass} onChangeText={props.handleChange('pass')} secureTextEntry={true} autoCapitalize="none" />
                                    <Space height={20} />
                                    <Button type="primary" onPress={(e) => {e.persist(); props.handleSubmit();}}>Masuk</Button>
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

const Loading = () => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={Warna.light} />
        </View>
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
