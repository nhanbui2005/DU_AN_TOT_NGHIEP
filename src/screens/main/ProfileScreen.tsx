import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MainNavProp } from "@/src/navigation/types";
import { Typography } from "../../components/Typography";
import { assets } from "../../theme/assets";
import { colors } from "../../theme";

export const ProfileScreen = () => {
   const navigation = useNavigation<MainNavProp>();

  const groupedMenuItems = [
    [
      {
        id: "1",
        title: "Personal Info",
        icon: assets.icons.profileScreen.user,
        color: colors.white,
        screen: "UserScreen",
      },
      {
        id: "2",
        title: "Addresses",
        icon: assets.icons.profileScreen.adderss,
        color: colors.white,
        screen: "NewAddressScreen",
      },
    ],
    [
      {
        id: "3",
        title: "Cart",
        icon: assets.icons.profileScreen.card,
        color: colors.white,
        screen: "CartScreen",
      },
      {
        id: "4",
        title: "Favourite",
        icon: assets.icons.profileScreen.favourite,
        color: colors.white,
        screen: "FavouriteScreen",
      },
      {
        id: "5",
        title: "Notifications",
        icon: assets.icons.profileScreen.notification,
        color: colors.white,
        screen: "NotificationsScreen",
      },
    ],
    [
      {
        id: "6",
        title: "FAQs",
        icon: assets.icons.profileScreen.fa,
        color: colors.white,
        screen: "FAQScreen",
      },
      {
        id: "7",
        title: "Đăng xuất",
        icon: assets.icons.profileScreen.setting,
        color: colors.white,
        action: () => {},
      },
    ],
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h5" style={styles.headerTitle}>
          Profile
        </Typography>
      </View>

      <View style={styles.userInfo}>
        <Image
          source={require("../../../assets/icons/image 1.png")}
          style={styles.avatar}
        />
        <Typography variant="h5" style={styles.userName}>
          Vishal Khadok
        </Typography>
      </View>

      {groupedMenuItems.map((group, index) => (
        <View key={index} style={styles.menuGroup}>
          {group.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                if (item.screen) {
                  navigation.navigate(item.screen as never);
                } else if (item.action) {
                  item.action();
                }
              }}
            >
              <View
                style={[styles.iconContainer, { backgroundColor: item.color }]}
              >
                <Image source={item.icon} style={styles.menuIcon} />
              </View>
              <Typography variant="body1" style={styles.menuText}>
                {item.title}
              </Typography>
              <Image
                source={assets.icons.profileScreen.right}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey[200],
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.orange.light,
    marginRight: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
  },
  menuGroup: {
    backgroundColor: colors.grey[200],
    borderRadius: 16,
    padding: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuIcon: {
    width: 30,
    height: 34,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    fontWeight: "500",
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: "black",
  },
});
