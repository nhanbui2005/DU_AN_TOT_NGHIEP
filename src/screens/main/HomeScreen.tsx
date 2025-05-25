import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { assets } from '../../theme/assets';

type Props = BottomTabScreenProps<MainStackParamList, 'Home'>;

const popularProducts = [
  {
    id: '1',
    name: 'Premium Dog Food',
    price: '$22.9',
    rating: 5,
    image: require('../../../assets/icons/image 3.png'), 
  },
  {
    id: '2',
    name: 'Premium Dog Food',
    price: '$22.9',
    rating: 5,
    image: require('../../../assets/icons/image 3.png'), 
  },
  {
    id: '3',
    name: 'Leather Dog Collar',
    price: '$9.9',
    rating: 5,
    image: require('../../../assets/icons/image 3.png'), 
  },
  {
    id: '4',
    name: 'Premium Dog Food',
    price: '$22.9',
    rating: 5,
    image: require('../../../assets/icons/image 3.png'), 
  },
];

export const HomeScreen = ({}: Props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={assets.images.logo} 
          style={styles.logo}
        />
        <View style={styles.headerIcons}>
          <Image
            source={assets.icons.homeScreen.bell} 
            style={styles.headerIcon}
          />
          <Image
            source={assets.icons.homeScreen.cart} 
            style={styles.headerIcon}
          />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Image
          source={assets.icons.homeScreen.search} 
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search for pet product..."
          style={styles.searchInput}
        />
      </View>

      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerTitle}>Special Offer!</Text>
          <Text style={styles.bannerSubtitle}>
            Get 20% off on all pet food this week
          </Text>
          <TouchableOpacity style={styles.shopNowButton}>
            <Text style={{ color: 'white' }}>Shop now</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={assets.images.image}
          style={styles.bannerImage}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Products</Text>
        <Text style={styles.sectionLink}>See All</Text>
      </View>
      <FlatList
        data={popularProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.starRow}>
              {[...Array(item.rating)].map((_, i) => (
                <Image
                  key={i}
                  source={assets.icons.homeScreen.star} 
                  style={styles.starIcon}
                />
              ))}
              <Text> {item.rating}</Text>
            </View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <TouchableOpacity style={styles.addButton}>
              <Image
                source={assets.icons.homeScreen.plus} 
                style={styles.plusIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Pet Services</Text>
        <Text style={styles.sectionLink}>See All</Text>
      </View>
      <View style={styles.services}>
        <View style={styles.serviceCardPink}>
          <Image
            source={assets.icons.homeScreen.scissors} 
            style={styles.serviceIcon}
          />
          <Text style={styles.serviceTitle}>Pet Grooming</Text>
          <Text style={styles.serviceDesc}>Professional care</Text>
          <TouchableOpacity style={styles.bookNowButton}>
            <Text style={styles.bookNowText}>Book now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.serviceCardBlue}>
          <Image
            source={assets.icons.homeScreen.house} 
            style={styles.serviceIcon}
          />
          <Text style={styles.serviceTitle}>Pet Sitting</Text>
          <Text style={styles.serviceDesc}>Care at your home</Text>
          <TouchableOpacity style={styles.bookNowButton}>
            <Text style={styles.bookNowText}>Book now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  logo: {
    width: 75,
    height: 75,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey[200],
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  banner: {
    backgroundColor: colors.blue.light,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bannerTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 12,
    marginBottom: 6,
  },
  bannerImage: {
    width: 87,
    height: 87,
  },
  shopNowButton: {
    backgroundColor: colors.blue.main,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionLink: {
    color: colors.blue.main,
    fontSize: 14,
  },
  productCard: {
    backgroundColor: colors.white,
    width: '48%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 134,
    height: 134,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  starIcon: {
    width: 15,
    height: 14,
    marginRight: 2,
  },
  productName: {
    fontSize: 13,
    marginBottom: 2,
  },
  productPrice: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  addButton: {
    backgroundColor: colors.blue.main,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  plusIcon: {
    width: 16,
    height: 16,
  },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  serviceCardPink: {
    backgroundColor: colors.pink.light,
    padding: 16,
    borderRadius: 10,
    width: '48%',
  },
  serviceCardBlue: {
    backgroundColor: colors.blue.light,
    padding: 16,
    borderRadius: 10,
    width: '48%',
  },
  serviceIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  serviceTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 12,
    marginBottom: 8,
  },
  bookNowButton: {
    borderWidth: 1,
    borderColor: colors.blue.main,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  bookNowText: {
    color: colors.blue.main,
    fontWeight: '600',
    fontSize: 12,
  },
});