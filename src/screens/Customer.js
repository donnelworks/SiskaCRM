import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const Customer = () => {
    return (
        <SkeletonPlaceholder  backgroundColor= 'red'>
            <View style={{ flexDirection: "row", alignItems: "center", }}>
                <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                <View
                    style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                />
                </View>
            </View>
        </SkeletonPlaceholder>
    )
}

export default Customer

const styles = StyleSheet.create({})
