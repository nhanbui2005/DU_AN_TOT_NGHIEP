import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { Typography } from '../../components/Typography';
import { assets } from '../../theme/assets';
import { BORDER_RADIUS } from '../../theme/layout';
import { sizes } from '../../theme';

type Props = BottomTabScreenProps<MainStackParamList, 'Home'>;

const products = [
  {
    id: '1',
    name: 'Premium Dog Food',
    price: '$22.9',
    rating: 5,
    image: 'https://cf.shopee.vn/file/a7e67cdcdfe21b7c9cad4b0ffbc9cf7f',
  },
  {
    id: '2',
    name: 'Premium Dog Food',
    price: '$22.9',
    rating: 5,
    image: 'https://cf.shopee.vn/file/a7e67cdcdfe21b7c9cad4b0ffbc9cf7f',
  },
  {
    id: '3',
    name: 'Premium Dog Food',
    price: '$22.9',
    rating: 5,
    image: 'https://cf.shopee.vn/file/a7e67cdcdfe21b7c9cad4b0ffbc9cf7f',
  },
  {
    id: '4',
    name: 'Premium Dog Food',
    price: '$22.9',
    rating: 5,
    image: 'https://cf.shopee.vn/file/a7e67cdcdfe21b7c9cad4b0ffbc9cf7f',
  },
];

export const ProductSeach: React.FC<Props> = () => {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderItem = ({ item }: { item: typeof products[0] }) => {
    const isSelected = selectedId === item.id;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelectedId(item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.stars}>★★★★★ {item.rating}</Text>
        <Typography variant="h6" style={styles.title}>
          {item.name}
        </Typography>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.plusButton}>
          <View style={styles.iconpluss}>
          <Image source={assets.icons.search.pluss}/>
          </View>
          
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={assets.icons.search.back} />
        </TouchableOpacity>
        <Typography variant="h5" style={styles.headerTitle}>
          Pet Food
        </Typography>
      </View>


      <TextInput
        style={styles.searchInput}
        placeholder="Search in Pet Shop...."
        value={search}
        onChangeText={setSearch}
      />


      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButton}>
          <Image source={assets.icons.search.vecter}/>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Price</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Rating</Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={products}
        numColumns={2}
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
    marginLeft: 10,
  },
  searchInput: {
    backgroundColor: colors.grey[200],
    borderRadius: BORDER_RADIUS.S,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey[200],
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.S,
  },
  filterText: {
    marginLeft: 5,
  },
  dropdown: {
    backgroundColor: colors.grey[200],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.S,
  },
  dropdownText: {
    fontSize: 14,
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    width: '48%',
    margin: '1%',
    borderRadius: BORDER_RADIUS.S,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background.default,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
  },
  selectedCard: {
    borderColor: colors.blue.light,
    borderWidth: 2,
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
  },
  stars: {
    fontSize: 14,
    color: colors.yellow.dark,
    marginTop: 5,
    marginLeft: '-40%',
  },
  title: {
    fontWeight: '600',
    marginVertical: 5,
    marginLeft: '0%',
  },
  price: {
    fontWeight: 'bold',
    color: colors.black,
    marginLeft: '-60%',
  },
  plusButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  mau: {
    color: colors.blue.main
  },
  iconpluss:{
    backgroundColor:colors.blue.main, 
    ...sizes.icon.md,
    borderRadius:BORDER_RADIUS.XL,
    alignItems:"center",
    justifyContent:"center"
  }
});
