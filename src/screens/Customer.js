import React, {useState, useEffect, useRef} from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { Warna } from '../utils/Warna'
import Ripple from 'react-native-material-ripple'
import { GlobalStyle } from '../utils/GlobalStyles'
import { Url } from '../utils/Url'
import axios from 'axios'
import { Search, Space } from '../components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import { Modalize } from 'react-native-modalize'

const Customer = ({navigation}) => {
    const [dataCustomer, setDataCustomer] = useState([]);
    const modalizeRef = useRef(null);
    
    const [namaDetail, setNamaDetail] = useState('');

    useEffect(() => {
        loadData();
    }, []);
    
    function loadData() {
        axios.get(Url.api + '/customer/data')
        .then(res => {
            setDataCustomer(res.data.data);
        });
    }

    const avatar = (str) => {
        return str.charAt(0).toUpperCase();
    }

    const editData = (map, key) => {
        if (map[key]) {
            map[key].closeRow();
        }
    }

    const showModal = (id) => {
        modalizeRef.current?.open();
        // axios.get(Url.api + '/customer/data', {
        //     params: {
        //         id: id,
        //     }
        // })
        // .then(res => {
        //     setNamaDetail(res.data.data.nama_customer);
        // });
    }

    const CustomerList = (data, rowMap) => (
        <SwipeRow disableLeftSwipe={true} leftOpenValue={80}>
            <View style={styles.opsiBack}>
                <View style={styles.editWrapper}>
                    <TouchableOpacity onPress={() => editData(rowMap, data.item.id_customer)}>
                        <Icon name="square-edit-outline" size={25} color={Warna.light} />
                    </TouchableOpacity>
                </View>
            </View>
    
            <Ripple rippleColor={Warna.softDark} style={styles.customerList} onPress={() => showModal(data.item.id_customer)}>
                <View style={styles.avatarWrapper}>
                    <View style={styles.avatar}>
                        <Text style={GlobalStyle.textAvatar}>{avatar(data.item.nama_customer)}</Text>
                    </View>
                </View>
                <View style={styles.centerWrapper}>
                    <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 14, color: Warna.dark, marginBottom: 5}} numberOfLines={2} >{data.item.nama_customer}</Text>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12, color: Warna.softDark}}>{data.item.tlp_customer}</Text>
                </View>
                <View style={styles.rightWrapper}>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12, color: Warna.softDark, marginBottom: 5}}>{data.item.nama_status}</Text>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12, color: Warna.softDark}}>{data.item.credit_customer == 1 ? "Cash" : data.item.credit_customer == 2 ? "Credit Ok" : "Credit Lancar"}</Text>
                </View>
            </Ripple>
    
        </SwipeRow>
    )

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

            <SwipeListView
            style={{paddingHorizontal: 10,}}
            data={dataCustomer}
            keyExtractor={item => item.id_customer}
            renderItem={CustomerList}
            />

            <Modalize ref={modalizeRef} withHandle={false}>
                <View style={styles.modalContentWrapper}>
                    <Text>oekkkke</Text>
                </View>
         
            </Modalize>
            
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
    opsiBack: {
        alignItems: 'center',
        backgroundColor: Warna.primary,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editWrapper: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContentWrapper: {
        marginHorizontal: 15,
        marginTop: 50,
        paddingTop: 10,
        height: 200,
        borderTopColor: Warna.lightDark,
        borderTopWidth: 1,
    }
})
