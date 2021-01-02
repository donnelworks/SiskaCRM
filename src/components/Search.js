import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Warna } from '../utils/Warna'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Search = () => {
    return (
        <View>
            <TextInput style={styles.search} placeholder="Cari customer" />
            <Icon name="magnify" size={20} color={Warna.dark} style={styles.searchIcon} />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    search: {
        height: 40,
        borderRadius: 8,
        backgroundColor: Warna.lightDark,
        paddingLeft: 35,
        paddingRight: 14,
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        color: Warna.dark,
    },
    searchIcon: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
})
