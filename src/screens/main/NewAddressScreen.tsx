import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
    Image,
    Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { MainNavProp } from "@/src/navigation/types";
import { colors } from "../../theme";
import { assets } from "../../theme/assets";
import { AddressService } from "@/src/api/services/address-services/address-services";

export const NewAddressScreen: React.FC = () => {
  const navigation = useNavigation<MainNavProp>();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  // lay tat ca cac tinh
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const data = await AddressService.getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error("loi dong 38: ", error);
      }
    };

    loadProvinces();
  }, []);

  // goi quan khi tinh duoc chon
  useEffect(() => {
    if (!selectedProvince) return;

    const loadDistricts = async () => {
      try {
        const data = await AddressService.getDistricts(selectedProvince);
        setDistricts(data);
      } catch (error) {
        console.error("loi dong 54:", error);
      }
    };

    loadDistricts();
    setSelectedDistrict("");
    setSelectedWard("");
    setWards([]);
  }, [selectedProvince]);

  // goi phuong khi quan duoc chon
  useEffect(() => {
    if (!selectedDistrict) return;

    const loadWards = async () => {
      try {
        const data = await AddressService.getWards(selectedDistrict);
        setWards(data);
      } catch (error) {
        console.error("loi dong 73:", error);
      }
    };

    loadWards();
    setSelectedWard("");
  }, [selectedDistrict]);

  const handleSave = () => {
    const address = {
      provinceCode: selectedProvince,
      districtCode: selectedDistrict,
      wardCode: selectedWard,
      houseNumber,
    };

    // Kiểm tra nếu thông tin chưa đầy đủ
    if (
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard ||
      !houseNumber.trim()
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin địa chỉ.");
      return;
    }
    console.log("address dong 99:", address);

    Alert.alert("Thành công", "Đã thêm địa chỉ mới", [
      {
        text: "OK",
        onPress: () => navigation.navigate("ProfileScreen"), 
      },
    ]);
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
        <Text style={styles.label}>Tỉnh/Thành phố</Text>
        <Picker
          selectedValue={selectedProvince}
          onValueChange={setSelectedProvince}
          style={styles.picker}
        >
          <Picker.Item label="Chọn tỉnh/thành" value="" />
          {provinces.map((item: any) => (
            <Picker.Item
              key={item.code}
              label={item.name}
              value={item.code.toString()}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Quận/Huyện</Text>
        <Picker
          selectedValue={selectedDistrict}
          onValueChange={setSelectedDistrict}
          style={styles.picker}
          enabled={!!selectedProvince}
        >
          <Picker.Item label="Chọn quận/huyện" value="" />
          {districts.map((item: any) => (
            <Picker.Item
              key={item.code}
              label={item.name}
              value={item.code.toString()}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Phường/Xã</Text>
        <Picker
          selectedValue={selectedWard}
          onValueChange={setSelectedWard}
          style={styles.picker}
          enabled={!!selectedDistrict}
        >
          <Picker.Item label="Chọn phường/xã" value="" />
          {wards.map((item: any) => (
            <Picker.Item
              key={item.code}
              label={item.name}
              value={item.code.toString()}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Số nhà</Text>
        <TextInput
          value={houseNumber}
          onChangeText={setHouseNumber}
          style={styles.textInput}
          placeholder="Nhập số nhà, tên đường..."
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Lưu địa chỉ</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#000"
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  content: {
    paddingBottom: 50
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 16
  },
  picker: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8
  },
  textInput: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#1E62EF",
    marginTop: 30,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700"
  },
});
