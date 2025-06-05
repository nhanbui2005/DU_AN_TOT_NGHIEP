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
import { colors } from '../../theme/colors';
import { assets } from '../../theme/assets';
import { Fonts } from '@/src/theme/fonts';
import { MainNavProp, PageNames } from '@/src/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ProductHomeDto } from '@/src/api/dto/home-dto/home.dto';
import { HomeService } from '@/src/api/services/home-service/home.service';



export const HomeScreen = () => {
  const [popularProducts, setPopularProducts] = useState<ProductHomeDto[]>([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const data = await HomeService.search({ limit: 4, sortBy: 'createdDate', order: 'desc' })
        setPopularProducts(data.data)
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        setPopularProducts([]);
      }
    };

    
    fetchPopularProducts();

    return () => {
      setPopularProducts([]);
    };
  }, []);


  const mainNav = useNavigation<MainNavProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={assets.images.logo}
          style={styles.logo}
        />
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => mainNav.navigate(PageNames.Notification)}>
            <Image
              source={assets.icons.homeScreen.bell}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => mainNav.navigate(PageNames.CartScreen)}>
            <Image
              source={assets.icons.homeScreen.cart}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
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
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.productCard}
            onPress={() => mainNav.navigate(PageNames.ProductDetail)}
          >
            {/* <Image source={item.image} style={styles.productImage} /> */}
            <Image source={{ uri: item.images[0] }} style={styles.productImage} />
            <View style={styles.starRow}>
              {[...Array(5/*todo: sau nay co don hang roi lam tiep */)].map((_, i) => (
                <Image
                  key={i}
                  source={assets.icons.homeScreen.star}
                  style={styles.starIcon}
                />
              ))}
              <Text> {5}</Text>
            </View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{
              item.minPromotionalPrice < item.maxPromotionalPrice
                ? `$${(item.minPromotionalPrice / 1000).toFixed(1)} - $${(item.maxPromotionalPrice / 1000).toFixed(1)}`
                : `$${(item.minPromotionalPrice / 1000).toFixed(1)}`
            }</Text>
            <TouchableOpacity style={styles.addButton}>

              <Image
                source={assets.icons.homeScreen.plus}
                style={styles.plusIcon}
              />
            </TouchableOpacity>

          </TouchableOpacity>
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
    padding: 5,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,

  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey[200],
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
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
    fontSize: 18,
    fontFamily: Fonts.roboto.bold,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 16,
    marginBottom: 6,
    fontFamily: Fonts.roboto.regular,

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
    fontSize: 20,
    marginBottom: 10,
  },
  sectionLink: {
    color: colors.blue.main,
    fontSize: 18,
  },
  productCard: {
    backgroundColor: colors.white,
    width: '47%',
    height: 280,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.grey[400],
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: 'relative',

  },
  productImage: {
    width: 170,
    height: 160,
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
    fontSize: 15,
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
    marginRight: 10,
    position: 'absolute',
    bottom: 16,

  },
  plusIcon: {
    width: 16,
    height: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 14,
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
    fontSize: 14,
  },
});

