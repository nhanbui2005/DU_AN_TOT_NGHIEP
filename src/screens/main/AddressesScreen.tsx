import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { colors } from '../../theme';
import { assets } from '../../theme/assets';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainStackParamList } from '../../navigation/types';

type Props = BottomTabScreenProps<MainStackParamList, 'Addresses'>;

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.fieldBox}>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  </View>
);

export const AddressesScreen: React.FC<Props> = ({ navigation }) => {
  const address = {
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    phone: '076-841-0926',
    houseNumber: '123',
    street: 'Nguyễn Văn Cừ',
    ward: 'Phường 5',
    district: 'Quận 5',
    city: 'TP. Hồ Chí Minh',
    country: 'Việt Nam',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image source={assets.icons.user.back} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.header}>Thông tin địa chỉ</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <InfoField label="HỌ VÀ TÊN" value={address.fullName} />
        <InfoField label="EMAIL" value={address.email} />
        <InfoField label="SỐ ĐIỆN THOẠI" value={address.phone} />
        <InfoField label="SỐ NHÀ" value={address.houseNumber} />
        <InfoField label="TÊN ĐƯỜNG" value={address.street} />
        <InfoField label="PHƯỜNG / XÃ" value={address.ward} />
        <InfoField label="QUẬN / HUYỆN" value={address.district} />
        <InfoField label="THÀNH PHỐ / TỈNH" value={address.city} />
        <InfoField label="QUỐC GIA" value={address.country} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: colors.black,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 16,
    color: colors.black,
    textAlign: 'center',
  },
  content: {
    paddingBottom: 30,
    paddingHorizontal: 4,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  fieldBox: {
    backgroundColor: '#F1F6FB',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  fieldValue: {
    fontSize: 14,
    color: '#333',
  },
});
