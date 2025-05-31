import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Typography } from '../../components/Typography';
import { assets } from '../../theme/assets';
import { colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { MainNavProp } from '@/src/navigation/types';

export const UserScreen = () => {
  const mainNav = useNavigation<MainNavProp>();
  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => mainNav.goBack()} style={styles.backButton}>
          <Image source={assets.icons.user.back} style={styles.backIcon} />
        </TouchableOpacity>
        <Typography style={styles.headerTitle}>User</Typography>
      </View>

      <View style={styles.userInfoContainer}>
        <Image
          source={require('../../../assets/icons/image 1.png')}
          style={styles.avatar}
        />

       
        <TouchableOpacity style={styles.changeAvatarButton} onPress={() => console.log('Đổi ảnh')}>
          <Typography style={styles.changeAvatarText}>Thay đổi ảnh</Typography>
        </TouchableOpacity>

        <View style={styles.infoGroup}>
          <Typography style={styles.label}>TÊN</Typography>
          <View style={styles.valueBox}>
            <Typography style={styles.value}>Vishal Khadok</Typography>
          </View>
        </View>

        <View style={styles.infoGroup}>
          <Typography style={styles.label}>SỐ ĐIỆN THOẠI</Typography>
          <View style={styles.valueBox}>
            <Typography style={styles.value}>+84 912 345 678</Typography>
          </View>
        </View>

        <View style={styles.infoGroup}>
          <Typography style={styles.label}>ĐỊA CHỈ</Typography>
          <View style={styles.valueBox}>
            <Typography style={styles.value}>123 Nguyễn Văn Cừ, Q.5, TP.HCM</Typography>
          </View>
        </View>

        <View style={styles.infoGroup}>
          <Typography style={styles.label}>EMAIL</Typography>
          <View style={styles.valueBox}>
            <Typography style={styles.value}>vishalkhadok@example.com</Typography>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey[200],
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  userInfoContainer: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: colors.orange?.light,
  },
  changeAvatarButton: {
    marginBottom: 24,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: colors.blue.dark,
    borderRadius: 20,
  },
  changeAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  infoGroup: {
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  valueBox: {
    backgroundColor: '#F1F6FB',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
});
