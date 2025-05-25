import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'; // Thêm Alert
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../../theme/colors';
import { Typography } from '../../components/Typography';
import { MainStackParamList } from '../../navigation/types'; // Import từ file types

type NavigationProp = StackNavigationProp<MainStackParamList, 'Setting'>;

export const AccountSettingsScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const menuItems = [
    { title: 'Tài khoản của tôi', onPress: () => {} },
    { title: 'Tài khoản / Thẻ ngân hàng', onPress: () => {} },
    { title: 'Cài đặt', onPress: () => {} },
    { title: 'Cài đặt Chat', onPress: () => {} },
    { title: 'Cài đặt Thông báo', onPress: () => {} },
    { title: 'Cài đặt Riêng tư', onPress: () => {} },
    { title: 'Người dùng khác trong', onPress: () => {} },
    { title: 'Ngôn ngữ / Language', onPress: () => {} },
    { title: 'Hỗ trợ', onPress: () => {} },
    { title: 'Trung tâm hỗ trợ', onPress: () => {} },
    { title: 'Tiêu chuẩn cộng đồng', onPress: () => {} },
    { title: 'Điều khoản Shopee', onPress: () => {} },
    { title: 'Hài lòng với Shopee? Hãy đánh giá ngay!', onPress: () => {} },
    { title: 'Giơí thiệu', onPress: () => {} },
    { title: 'Yêu cầu hủy tài khoản', onPress: () => {} },
  ];

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Đăng xuất', onPress: () => navigation.navigate('Check') }, // Bây giờ Check đã có trong MainStackParamList
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Typography variant="body1" style={styles.backButton}>
              {'<'}
            </Typography>
          </TouchableOpacity>
          <Typography variant="h4" style={styles.title}>
            Thiết lập tài khoản
          </Typography>
        </View>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Typography variant="body1">{item.title}</Typography>
            <Typography variant="body2" style={styles.arrow}>
              {'>'}
            </Typography>
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Typography variant="body1" style={styles.logoutText}>
            Đăng xuất
          </Typography>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background.default,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    color: colors.text.primary,
    fontSize: 18,
    marginRight: 16,
  },
  title: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background.paper,
  },
  arrow: {
    color: colors.text.secondary,
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: colors.background.paper,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  logoutText: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
});