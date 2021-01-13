import React, {useState, useEffect, useRef} from 'react'
import { Modal, FlatList, ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { Warna } from '../utils/Warna'
import Ripple from 'react-native-material-ripple'
import { GlobalStyle } from '../utils/GlobalStyles'
import { Url } from '../utils/Url'
import axios from 'axios'
import { Button, Search, Space } from '../components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import { Modalize } from 'react-native-modalize'
import FAB from 'react-native-fab'

const Customer = ({navigation}) => {
    const modalizeRef = useRef(null);
    const [dataCustomer, setDataCustomer] = useState([]);
    const [loadingModal, setLoadingModal] = useState(false);
    const [btnVisible, setBtnVisible] = useState(true);
    const [modalKonfirm, setModalKonfirm] = useState(false);
    const [idKonfirm, setIdKonfirm] = useState(0);
    const [loading, setLoading] = useState(false);

    const [statusDetail, setStatusDetail] = useState("");
    const [creditDetail, setCreditDetail] = useState("");
    const [namaDetail, setNamaDetail] = useState("");
    const [tlpDetail, setTlpDetail] = useState("");
    const [npwpDetail, setNpwpDetail] = useState("");
    const [alamatNpwpDetail, setAlamatNpwpDetail] = useState("");
    const [alamatKantorDetail, setAlamatKantorDetail] = useState("");
    const [alamat1Detail, setAlamat1Detail] = useState("");
    const [alamat2Detail, setAlamat2Detail] = useState("");
    const [cttDetail, setCttDetail] = useState("");
    const [profileDetail, setProfileDetail] = useState("");
    const [tagDetail, setTagDetail] = useState([]);
    const [buatCustomerDetail, setBuatCustomerDetail] = useState("");
    const [ubahCustomerDetail, setUbahCustomerDetail] = useState("");

    useEffect(() => {
        loadData();
    }, []);
    
    function loadData() {
        axios.get(`${Url.api}/customer/data`)
        .then(res => {
            setDataCustomer(res.data.data);
        });
    }

    const avatar = (str) => {
        const first = str.charAt(0).toUpperCase();
        const second = str.charAt(1).toUpperCase();
        return first + second;
    }

    const tglJam = (str) => {
        const bulanIndo = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Juni', 'Juli', 'Agt', 'Sep' , 'Okt', 'Nov', 'Des'];
        const date = str.split(" ")[0];
        const time = str.split(" ")[1];
        const tanggal = date.split("-")[2];
        const bulan = date.split("-")[1];
        const tahun = date.split("-")[0];
        return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun + " - " + time;
    }

    const closeSwipe = (map, key) => {
        if (map[key]) {
            map[key].closeRow();
        }
    }

    const editKonfirm = (map, key) => {
        closeSwipe(map, key);
    }

    const hapusKonfirm = (map, key) => {
        closeSwipe(map, key);
        setModalKonfirm(true);
        setIdKonfirm(key);
    }
    const hapusData = (id) => {
        setLoading(true);
        setModalKonfirm(false);
        axios.delete(`${Url.api}/customer/data/hapus/${id}`)
        .then(res => {
            setLoading(false);
            loadData();
        })
        .catch(err => {
            setLoading(false);
        })
    }

    const handleBeginScroll = () => {
        setBtnVisible(false);
    }

    const handleEndScroll = () => {
        setBtnVisible(true);
    }

    const tags = (tag) => {
        axios.get(Url.api + '/customer/data/load_tag', {
            params: {
                tag: tag,
            }
        })
        .then(res => {
            console.log(res);
            setLoadingModal(false);
            setTagDetail(res.data.data);
        })
    }

    const showModal = (id) => {
        setLoadingModal(true);
        modalizeRef.current?.open();
        setTimeout(() => {
            axios.get(Url.api + '/customer/data', {
                params: {
                    id: id,
                }
            })
            .then(res => {
                tags(res.data.data.tag_customer);
                setStatusDetail(res.data.data.nama_status);
                setCreditDetail(res.data.data.credit_customer);
                setNamaDetail(res.data.data.nama_customer);
                setTlpDetail(res.data.data.tlp_customer);
                setNpwpDetail(res.data.data.npwp_customer);
                setAlamatNpwpDetail(res.data.data.alamat_npwp_customer);
                setAlamatKantorDetail(res.data.data.alamat_kantor_customer);
                setAlamat1Detail(res.data.data.alamat_1_customer);
                setAlamat2Detail(res.data.data.alamat_2_customer);
                setCttDetail(res.data.data.ctt_customer);
                setProfileDetail(res.data.data.profile_customer);
                setBuatCustomerDetail(res.data.data.buat_customer);
                setUbahCustomerDetail(res.data.data.ubah_customer);
            });
        }, 1000)
    }

    const CustomerList = (data, rowMap) => (
        <SwipeRow disableLeftSwipe={true} leftOpenValue={160}>
            <View style={styles.opsiBack}>
                <TouchableOpacity style={styles.editWrapper} onPress={() => editKonfirm(rowMap, data.item.id_customer)}>
                    <Icon name="square-edit-outline" size={25} color={Warna.light} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.hapusWrapper} onPress={() => hapusKonfirm(rowMap, data.item.id_customer)}>
                    <Icon name="trash-can-outline" size={25} color={Warna.light} />
                </TouchableOpacity>
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

    const ContentModal = () => (
        <View style={styles.modalContentWrapper}>
            <View style={{minHeight: 50, flexDirection:'row', marginBottom: 10}}>
                <View style={{flex: 1, minHeight: 50, justifyContent: 'center'}}>
                    <Text style={styles.titleDetail}>Status</Text>
                    <Text style={styles.textDetail}>{statusDetail}</Text>
                </View>
                <View style={{flex: 1, minHeight: 50, justifyContent: 'center'}}>
                    <Text style={styles.titleDetail}>Credit</Text>
                    <Text style={styles.textDetail}>{creditDetail == 1 ? "Cash" : creditDetail == 2 ? "Credit Ok" : "Credit Lancar"}</Text>
                </View>
            </View>

            <View style={{minHeight: 50, justifyContent: 'center', marginBottom: 10}}>
                <Text style={styles.titleDetail}>Nama</Text>
                <Text style={styles.textDetail}>{namaDetail}</Text>
            </View>

            <View style={{minHeight: 50, flexDirection:'row', marginBottom: 10}}>
                <View style={{flex: 1, minHeight: 50, justifyContent: 'center'}}>
                    <Text style={styles.titleDetail}>No. Tlp.</Text>
                    <Text style={styles.textDetail}>{tlpDetail}</Text>
                </View>
                <View style={{flex: 1, minHeight: 50, justifyContent: 'center'}}>
                    <Text style={styles.titleDetail}>No. NPWP</Text>
                    <Text style={styles.textDetail}>{npwpDetail == null ? "-" : npwpDetail}</Text>
                </View>
            </View>

            <View style={{minHeight: 50, justifyContent: 'center', marginBottom: 10}}>
                <Text style={styles.titleDetail}>Alamat NPWP</Text>
                <Text style={styles.textDetail}>{alamatNpwpDetail == null ? "-" : alamatNpwpDetail}</Text>
            </View>

            <View style={{minHeight: 50, justifyContent: 'center', marginBottom: 10}}>
                <Text style={styles.titleDetail}>Alamat Kantor</Text>
                <Text style={styles.textDetail}>{alamatKantorDetail == null ? "-" : alamatKantorDetail}</Text>
            </View>

            <View style={{minHeight: 50, justifyContent: 'center', marginBottom: 10}}>
                <Text style={styles.titleDetail}>Alamat 1</Text>
                <Text style={styles.textDetail}>{alamat1Detail}</Text>
            </View>

            <View style={{minHeight: 50, justifyContent: 'center', marginBottom: 10}}>
                <Text style={styles.titleDetail}>Alamat 2</Text>
                <Text style={styles.textDetail}>{alamat2Detail == null ? "-" : alamat2Detail}</Text>
            </View>

            <View style={{minHeight: 50, justifyContent: 'center', marginBottom: 10}}>
                <Text style={styles.titleDetail}>Catatan</Text>
                <Text style={styles.textDetail}>{cttDetail == null ? "-" : cttDetail}</Text>
            </View>

            <View style={{minHeight: 50, justifyContent: 'center', marginBottom: 10}}>
                <Text style={styles.titleDetail}>Profile</Text>
                <Text style={styles.textDetail}>{profileDetail == null ? "-" : profileDetail}</Text>
            </View>

            <View style={{minHeight: 50, justifyContent: 'center', marginBottom: 10}}>
                <Text style={styles.titleDetail}>Tags</Text>
                <View style={{flexDirection: 'row'}}>
                    {tagDetail.map(data => {
                        return data.length != 0 ? <TagsList key={data.id_tag} tag={data.nama_tag} /> : <Text style={styles.textDetail}>-</Text>
                    })}
                </View>
                
            </View>

            <View style={{minHeight: 50, flexDirection:'row', marginBottom: 10}}>
                <View style={{flex: 1, minHeight: 50, justifyContent: 'center'}}>
                    <Text style={styles.titleDetail}>Buat Customer</Text>
                    <Text style={styles.textDetail}>{tglJam(buatCustomerDetail)}</Text>
                </View>
                <View style={{flex: 1, minHeight: 50, justifyContent: 'center'}}>
                    <Text style={styles.titleDetail}>Ubah Customer</Text>
                    <Text style={styles.textDetail}>{ubahCustomerDetail == null ? "-" : tglJam(ubahCustomerDetail)}</Text>
                </View>
            </View>
        </View>
    )

    const ModalKonfirm = ({id}) => (
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalKonfirm}
        >
            <View style={styles.modalWrapper}>
                <View style={styles.modalBody}>
                    <Text style={styles.modalTitle}>Konfirmasi</Text>
                    <Text style={styles.modalText}>Kamu yakin ingin hapus data? </Text>
                    <View style={styles.btnKonfirmWrapper}>
                        <View style={{flex: 1, paddingRight: 5}}>
                            <Button type="primary" onPress={() => hapusData(id)}>Iya</Button>
                        </View>
                        <View style={{flex: 1, paddingLeft: 5}}>
                            <Button type="disabled" onPress={() => setModalKonfirm(false)}>Tidak</Button>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )

    const LoadingModal = () => (
        <View style={styles.loadingModal}>
            <ActivityIndicator size="large" color={Warna.primary} />
        </View>
    )

    const TagsList = ({tag}) => (
        <View style={styles.tagsList}>
            <Text style={styles.textTag}>{tag}</Text>
        </View>
    )

    const Loading = () => (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={Warna.light} />
        </View>
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
            onScrollBeginDrag={handleBeginScroll}
            onMomentumScrollEnd={handleEndScroll}
            />

            {/* MODAL DETAIL */}
            <Modalize 
            ref={modalizeRef} 
            withHandle={false} 
            HeaderComponent={
                <View style={{padding: 15}}>
                    <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 16, color: Warna.dark}}>Detail</Text>
                </View>
            }
            >
            {loadingModal == true ? <LoadingModal /> : <ContentModal />}
            </Modalize>
            {/* === */}

            {/* MODAL CONFIRM */}
            <ModalKonfirm id={idKonfirm} />
            {/* === */}

            <FAB
            buttonColor={Warna.primary} 
            iconTextColor={Warna.light} 
            iconSize={30}
            buttonSize={60}
            onClickAction={() => navigation.navigate('Tambah Customer')} 
            visible={btnVisible} 
            iconTextComponent={
            <Icon name="plus" />
            } />

            {loading == true && ( <Loading /> )}
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
    },
    editWrapper: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hapusWrapper: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContentWrapper: {
        marginHorizontal: 15,
        paddingTop: 10,
        borderTopColor: Warna.lightDark,
        borderTopWidth: 1,
    },
    titleDetail: {
        fontFamily: 'Montserrat-Bold',
        color: Warna.primary,
        fontSize: 14,
    },
    textDetail: {
        fontFamily: 'Montserrat-Medium',
        color: Warna.dark,
        fontSize: 12,
    },
    textTag: {
        fontFamily: 'Montserrat-SemiBold',
        color: Warna.light,
        fontSize: 12,
    },
    LoadingModal: {
        flex: 1,
        justifyContent: 'center', 
    },
    tagsList: {
        height: 20,
        paddingHorizontal: 10,
        backgroundColor: Warna.primary,
        justifyContent: 'center',
        borderRadius: 50,
        marginRight: 5,
        marginTop: 2,
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalBody: {
        backgroundColor: Warna.light,
        padding: 20,
        borderRadius: 10,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: Warna.dark,
        marginBottom: 20,
        alignSelf: 'center',
    },
    modalText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: Warna.dark,
        marginBottom: 20,
    },
    btnKonfirmWrapper: {
        flexDirection: 'row',
    },
    loading: {
        width: '100%',
        height: '100%', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(85, 110, 230, 0.9)', 
        position: 'absolute',
        zIndex: 2,
    },
})
