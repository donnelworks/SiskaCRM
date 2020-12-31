import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Warna } from '../utils/Warna';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';
import { Space } from '../components';
import axios from 'axios';
import { Url } from '../utils/Url';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Home = ({navigation}) => {
    // State
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState(0);
    const [opp, setOpp] = useState(0);
    const [quotation, setQuotation] = useState(0);
    const [reminder, setReminder] = useState(0);
    const [openOpp, setOpenOpp] = useState([]);
    const [quotOpp, setQuotOpp] = useState([]);
    const [closedOpp, setClosedOpp] = useState([]);

    // Load data
    const loadData = () => {
        axios.get(Url.api + '/dashboard')
        .then(res => {
            setLoading(false);
            setCustomer(res.data.data.jumlah_customer);
            setOpp(res.data.data.jumlah_opp);
            setQuotation(res.data.data.jumlah_quotation);
            setReminder(res.data.data.jumlah_reminder);
            setOpenOpp(res.data.data.load_open_opp);
            setQuotOpp(res.data.data.load_quot_opp);
            setClosedOpp(res.data.data.load_closed_opp);
        });
    }

    // Navigation
    const pindahScreen = (screen) => {
        navigation.navigate(screen)
    }

    // Hook
    useEffect(() => {
        loadData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.navBarWrapper}>
                        <Ripple rippleColor="#fff" style={styles.userWrapper}>
                            <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 16, marginLeft: 5, color: '#fff'}}>Nama User</Text>
                            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14, marginLeft: 5, color: '#fff'}}>Level</Text>
                        </Ripple>
                        <View style={styles.notifWrapper}>
                            <TouchableOpacity>
                                <Icon name="bell-outline" size={23} style={{color: '#fff'}} />
                            </TouchableOpacity>
                            {reminder != 0 && (
                                <View style={styles.labelNotif}>
                                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 10, color: '#fff'}}>{reminder}</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.configWrapper}>
                            <TouchableOpacity>
                                <Icon name="cog-outline" size={23} style={{color: '#fff'}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Body */}
                <View style={styles.body}>
                    <Space height={70} />
                    {/* Menu */}
                    <View style={styles.menuWrapper}>
                        <Menu title="Customer" icon="account-circle-outline" onPress={() => pindahScreen('Customer')} />
                        <Menu title="Sales Opp" icon="briefcase-variant-outline" />
                        <Menu title="Setup" icon="tune" />
                        <Menu title="Quotation" icon="script-text-outline" />
                        <Menu title="Reminder" icon="bell-outline" />
                        <Menu title="Laporan" icon="clipboard-text-outline" />
                    </View>
                    <Space height={20} />

                    {/* Open Opp */}
                    <View style={styles.quotationWrapper}>
                        <View style={styles.quotationHead}>
                            <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 14, color: Warna.dark}}>Open Opportunity</Text>
                            <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 12, color: Warna.primary}}>Lihat Semua</Text>
                        </View>
                        {loading == true ?
                            <View style={styles.quotationList}>
                                <LoadingOpp />
                                <LoadingOpp />
                            </View>
                        :
                            <View style={styles.quotationList}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {openOpp.map(data => {
                                        return <OpenOpp onPress={() => alert(data.nama_proyek_opp)} key={data.id_opp} record={"#"+data.no_opp} proyek={data.nama_proyek_opp} customer={data.nama_customer == null ? 'Tidak ditemukan' : data.nama_customer} /> 
                                    })}
                                </ScrollView>
                            </View>
                        }
                    </View>

                    <Space height={10} />

                    {/* Quotation Opp */}
                    <View style={styles.quotationWrapper}>
                        <View style={styles.quotationHead}>
                            <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 14, color: Warna.dark}}>Quotation Opportunity</Text>
                            <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 12, color: Warna.primary}}>Lihat Semua</Text>
                        </View>
                        {loading == true ?
                            <View style={styles.quotationList}>
                                <LoadingOpp />
                                <LoadingOpp />
                            </View>
                        :
                            <View style={styles.quotationList}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {quotOpp.map(data => {
                                        return <QuotOpp key={data.id_opp} record={"#"+data.no_opp} proyek={data.nama_proyek_opp} customer={data.nama_customer == null ? 'Tidak ditemukan' : data.nama_customer} /> 
                                    })}
                                </ScrollView>
                            </View>
                        }
                    </View>

                    <Space height={10} />

                    {/* Closed Opp */}
                    <View style={styles.quotationWrapper}>
                        <View style={styles.quotationHead}>
                            <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 14, color: Warna.dark}}>Closed Opportunity</Text>
                            <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 12, color: Warna.primary}}>Lihat Semua</Text>
                        </View>
                        {loading == true ?
                            <View style={styles.quotationList}>
                                <LoadingOpp />
                                <LoadingOpp />
                            </View>
                        :
                            <View style={styles.quotationList}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {closedOpp.map(data => {
                                        return <ClosedOpp key={data.id_opp} record={"#"+data.no_opp} proyek={data.nama_proyek_opp} customer={data.nama_customer == null ? 'Tidak ditemukan' : data.nama_customer} /> 
                                    })}
                                </ScrollView>
                            </View>
                        }
                        
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={{fontFamily: 'Montserrat-Medium', color: Warna.softDark}}>© Copyright 2020 SISKA CRM</Text>
                </View>

                {/* Status List */}
                <View style={styles.statusWrapper}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Status title="Customer" jumlah={customer} icon="account-circle-outline" />
                        <Status title="Sales Opp" jumlah={opp} icon="briefcase-variant-outline" />
                        <Status title="Quotation" jumlah={quotation} icon="script-text-outline" />
                    </ScrollView>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const Status = ({title, jumlah, icon}) => {
    return (
        <View style={styles.status}>
            <View style={{flex: 2, justifyContent: 'center', paddingLeft: 10}}>
                <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 18, color: Warna.primary}}>{title}</Text>
                <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 24, color: Warna.primary}}>{jumlah}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name={icon} size={50} color={Warna.primary} />
            </View>
        </View>
    )
}

const Menu = ({title, icon, ...props}) => {
    return (
        <Ripple rippleColor={Warna.softDark} style={styles.menu} {...props}>
            <Icon name={icon} size={30} color={Warna.primary} style={{backgroundColor: Warna.softPrimary, padding: 10, borderRadius: 50/2}} />
            <Space height={10} />
            <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 12, color: Warna.softDark}}>{title}</Text>
        </Ripple>
    )
}

const OpenOpp = ({record, proyek, customer, ...props}) => {
    return (
        <Ripple rippleColor={Warna.success} style={styles.openOpp} {...props}>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12, color: Warna.success}}>{record}</Text>
            <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 14, color: Warna.success}}>{proyek}</Text>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12, color: Warna.success, textAlign: 'right'}}>{customer}</Text>
        </Ripple>
    )
}

const QuotOpp = ({record, proyek, customer}) => {
    return (
        <Ripple rippleColor={Warna.primary} style={styles.quotOpp}>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12, color: Warna.primary}}>{record}</Text>
            <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 14, color: Warna.primary}}>{proyek}</Text>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12, color: Warna.primary, textAlign: 'right'}}>{customer}</Text>
        </Ripple>
    )
}

const ClosedOpp = ({record, proyek, customer}) => {
    return (
        <Ripple rippleColor={Warna.danger} style={styles.closedOpp}>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12, color: Warna.danger}}>{record}</Text>
            <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 14, color: Warna.danger}}>{proyek}</Text>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12, color: Warna.danger, textAlign: 'right'}}>{customer}</Text>
        </Ripple>
    )
}

const LoadingOpp = () => {
    return (
        <SkeletonPlaceholder backgroundColor={Warna.skeleton}>
            <View style={{marginHorizontal: 10, height: 80, width: 280, paddingVertical: 10}}>
                <View style={{ width: 120, height: 15, borderRadius: 50 }} />
                <View style={{ width: 180, height: 15, borderRadius: 50, marginTop: 10 }} />
                <View style={{ width: 100, height: 15, borderRadius: 50, marginTop: 10, alignSelf: 'flex-end' }} />
            </View>
        </SkeletonPlaceholder>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Warna.light,
    },
    header: {
        height: 120,
        backgroundColor: Warna.primary,
        position: 'relative',
    },
    navBarWrapper: {
        flexDirection: 'row',
        height: 50,
    },
    userWrapper: {
        flex: 4,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    notifWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    labelNotif: {
        backgroundColor: Warna.danger,
        height: 15,
        minWidth: 15,
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderRadius: 50/2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 5,
        right: 10,
    },
    configWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusWrapper: {
        flexDirection: 'row',
        width: '100%',
        height: 115,
        position: 'absolute',
        top: 70,
    },
    status: {
        height: 100,
        width: 250,
        backgroundColor: Warna.softPrimary,
        borderRadius: 8,
        marginHorizontal: 10,
        elevation: 5,
        flexDirection: 'row',
    },
    body: {
        position: 'relative',
    },
    menuWrapper: {
        marginHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    menu: {
        height: 110,
        width: 110,
        backgroundColor: Warna.light,
        borderRadius: 8,
        marginVertical: 5,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quotationHead: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    quotationList: {
        flexDirection: 'row',
        width: '100%',
        height: 100,
    },
    openOpp: {
        backgroundColor: Warna.softSuccess,
        width: 280,
        height: 80,
        borderRadius: 8,
        elevation: 3,
        marginHorizontal: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    quotOpp: {
        backgroundColor: Warna.softPrimary,
        width: 280,
        height: 80,
        borderRadius: 8,
        elevation: 3,
        marginHorizontal: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    closedOpp: {
        backgroundColor: Warna.softDanger,
        width: 280,
        height: 80,
        borderRadius: 8,
        elevation: 3,
        marginHorizontal: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    footer: {
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
