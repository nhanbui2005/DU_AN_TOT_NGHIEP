import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { MainNavProp } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { Typography } from '../../components/Typography';
import { assets } from '../../theme/assets';
import { BORDER_RADIUS } from '../../theme/layout';
import { useNavigation } from '@react-navigation/native';

const products = [
    {
        id: '1',
        title: "Khuyến mãi hè",
        message: "Giảm giá 50% tất cả sản phẩm đến hết ngày 30/6! ",
        timestamp: "2025-05-30T10:30:00Z",
        read: false
    },
    {
        id: '2',
        title: "Đơn hàng đã được giao",
        message: "Đơn hàng #12345 của bạn đã được giao thành công.Đơn hàng #12345 của bạn đã được giao thành công.Đơn hàng #12345 của bạn đã được giao thành công.",
        timestamp: "2025-05-28T15:45:00Z",
        read: true
    },
    {
        id: '3',
        title: "Đơn hàng đã được giao",
        message: "Đơn hàng #12345 của bạn đã được giao thành công.Đơn hàng #12345 của bạn đã được giao thành công.Đơn hàng #12345 của bạn đã được giao thành công.",
        timestamp: "2025-05-28T15:45:00Z",
        read: true
    },
];

export const NotificationsScreen: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
  const mainNav = useNavigation<MainNavProp>();

    const renderItem = ({ item }: { item: typeof products[0] }) => {
        const isSelected = selectedId === item.id;

        return (
            <TouchableOpacity
                style={[styles.notifications, isSelected && styles.selectedNotifications]}
                onPress={() => setSelectedId(item.id)}
            >
                <View>
                    <Image style={styles.notiFications} source={assets.icons.profileScreen.notification}/>
                    <Typography variant="h6" style={styles.title}> {item.title}</Typography>
                </View>
                
                <Text>{ item.message}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={()=>mainNav.goBack()}>
                    <Image source={assets.icons.back} />
                </TouchableOpacity>
                <Typography variant="h4" style={styles.headerTitle}>
                Notifications
                </Typography>
            </View>



            <FlatList
                data={products}
                numColumns={1}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.default,
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: '10%',
    },
    headerTitle: {
        fontWeight: 'bold',
        marginLeft: "31%",
    },
    searchInput: {
        backgroundColor: colors.grey[200],
        borderRadius: BORDER_RADIUS.S,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 10,
    },
    list: {
        paddingBottom: 30,
    },
    notifications: {
        width: '95%',
        margin: '1%',
        borderRadius: BORDER_RADIUS.S,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background.default,
        padding: 10,
        position: 'relative',
    },
    selectedNotifications: {
        borderColor: colors.blue.light,
        borderWidth: 2,
    },
    title: {
        fontWeight: '600',
        marginVertical: 5,
    },
    mau: {
        color: colors.blue.main
    },
    notiFications:{
        marginRight:"100%"
    },
});
