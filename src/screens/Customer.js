import React, {useState, useEffect} from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { Warna } from '../utils/Warna'
import Ripple from 'react-native-material-ripple'
import { GlobalStyle } from '../utils/GlobalStyles'
import { Url } from '../utils/Url'
import axios from 'axios'
import { Search, Space } from '../components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CustomerList = ({item}) => {
    const avatar = (str) => {
        return str.charAt(0).toUpperCase();
    }

    return (
        <View>
            <Ripple rippleColor={Warna.softDark} style={styles.customerList}>
                <View style={styles.avatarWrapper}>
                    <View style={styles.avatar}>
                        <Text style={GlobalStyle.textAvatar}>{avatar(item.nama_customer)}</Text>
                    </View>
                </View>
                <View style={styles.centerWrapper}>
                    <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 14, color: Warna.dark, marginBottom: 5}} numberOfLines={2} >{item.nama_customer}</Text>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12, color: Warna.softDark}}>{item.tlp_customer}</Text>
                </View>
                <View style={styles.rightWrapper}>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12, color: Warna.softDark, marginBottom: 5}}>{item.nama_status}</Text>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12, color: Warna.softDark}}>{item.credit_customer == 1 ? "Cash" : item.credit_customer == 2 ? "Credit Ok" : "Credit Lancar"}</Text>
                </View>
            </Ripple>
        </View>
        
    )
}

const Customer = ({navigation}) => {
    const [dataCustomer, setDataCustomer] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    function loadData() {
        axios.get(Url.api + '/customer/data')
        .then(res => {
            setDataCustomer(res.data.data);
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchWrapper}>
                    <Search />
                </View>
                <View style={styles.filterWrapper}>
                    <TouchableOpacity>
                        <Icon name="filter-outline" size={25} color={Warna.primary} style={styles.filter} />
                    </TouchableOpacity>
                </View>
            </View>

            <Space height={10} />

            <FlatList
            style={{paddingHorizontal: 10,}}
            data={dataCustomer}
            keyExtractor={item => item.id_customer}
            renderItem={CustomerList}
            />

            
        </SafeAreaView>
    )
}

export default Customer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Warna.light,
        
    },
    customerList: {
        backgroundColor: Warna.light,
        height: 80,
        flexDirection: 'row',
        padding: 5,
        borderBottomColor: Warna.lightDark,
        borderBottomWidth: 1,
    },
    avatarWrapper: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerWrapper: {
        flex: 2,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    rightWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 100 / 2,
        backgroundColor: Warna.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        height: 70,
        paddingHorizontal: 10,
    },
    searchWrapper: {
        flex: 4,
        justifyContent: 'center'
    },
    filterWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filter: {
        backgroundColor: Warna.light,
        padding: 8,
        borderRadius: 50 / 2,
    },
})
